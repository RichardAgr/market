<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\SelectionDetail;
use Illuminate\Support\Facades\DB;
use Error;
use Illuminate\Database\QueryException;


class ReportingController extends Controller
{
    public function index()
    {
        return view('reporting.index');
    }


    public function getEconomicReport(Request $request)
    {
        $typeReport = $request['typeReport'];
        $year = $request['year'];
        $res = [];
        try {
            $data = $typeReport == 'month'
                ? $this->getEconomicReportForMonth($year)
                : $this->getEconomicReportForYear();
            $res = ['success' => true, 'data' => $data, 'total'=> $this->getTotal($data)];
        } catch (Error $e) {
            $res = ['success' => false, 'error' => $e];
        }
        return $res;
    }

    private function getTotal($data)
    {
        $total = 0;
        foreach($data as $d){
            $total += $d['total'];
        }
        return $total;
    }

    private function getEconomicReportForYear()
    {
        $report =  Order::join('selection_details', 'orders.id', '=', 'selection_details.order_id')
            ->select(DB::raw('YEAR(orders.created_at) as year'), DB::raw('SUM(subtotal) as total'))
            ->groupBy(DB::raw('YEAR(orders.created_at)'))
            ->orderBy(DB::raw('YEAR(orders.created_at)'))
            ->get();
        return $report;
    }

    private function getEconomicReportForMonth($year)
    {
        $report =  Order::join('selection_details', 'orders.id', '=', 'selection_details.order_id')
            ->select(DB::raw('MONTH(orders.created_at) as month'), DB::raw('SUM(subtotal) as total'))
            ->where(DB::raw('YEAR(orders.created_at)'), $year)
            ->groupBy(DB::raw('MONTH(orders.created_at)'))
            ->orderBy(DB::raw('MONTH(orders.created_at)'))
            ->get();
        return $report;
    }
    
    public function getOrdersYears()
    {
        try {
            $years = Order::select(DB::raw('YEAR(orders.created_at) as year'))
                ->groupBy(DB::raw('YEAR(orders.created_at)'))
                ->orderBy(DB::raw('YEAR(orders.created_at)'))
                ->get();
            return response()->json(['success'=>true,'data' => $years]);
        } catch (Error $e) {
            return response()->json(['success' => false,'error' => $e]);
        }
    }

    public function getSalesReport($startDate, $endDate)
    {
        $sales = SelectionDetail::with(['product', 'order', 'order.user'])->whereHas(
            'order',
            function ($query) use ($startDate, $endDate) {
                $query->where('payment_status', 1)
                    ->whereBetween('created_at', [$startDate, $endDate]);
            }
        )
            ->get();

        return response()->json($sales);
    }

    public function getInventoryReport($startDate, $endDate)
    {
        $inventories = Product::with(['inventories', 'selectionDetails.order' => function ($query) use ($startDate, $endDate) {
            $query->where('payment_status', 1)
                ->whereBetween('created_at', [$startDate, $endDate]);
        }])->get();
        return response()->json($inventories);
    }

    public function getUserReport($startDate, $endDate)
    {
        $users = User::with(['orders' => function ($query) use ($startDate, $endDate) {
            $query->where('payment_status', 1)
                ->whereBetween('created_at', [$startDate, $endDate]);
        }])->get();
        return response()->json($users);
    }

    public function getUserRegisterReport()
    {
        $users = User::where('is_admin', 0)->get();
        return response()->json($users);
    }

    public function destroyUserRegistred($id)
{
    try {
        $user = User::withTrashed()->find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado exitosamente']);
        } else {
            return response()->json(['message' => 'Usuario no encontrado']);
        }
    } catch (QueryException $e) {
        return response()->json(['message' => $e->getMessage()]);
    }
}
}
