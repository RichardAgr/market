<?php

namespace App\Http\Controllers;

use App\Models\Inventary;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function mostSelleds($dateStart, $dateEnd)
    {
        $mostSelleds = Product::whereBetween('created_at', [$dateStart, $dateEnd])
            ->whereHas('selectionDetails.order', function ($q) {
                $q->where('payment_status', 1);
            })
            ->with([
                'selectionDetails.order' => function ($q) {
                    $q->where('payment_status', 1);
                },
                'selectionDetails' => function ($q) {
                    $q->whereHas('order', function ($q) {
                        $q->where('payment_status', 1);
                    });
                },
            ])
            ->withSum(['selectionDetails' => function ($q) {
                $q->whereHas('order', function ($q) {
                    $q->where('payment_status', 1);
                });
            }], 'quantity')
            ->orderBy('selection_details_sum_quantity', 'desc')
            ->get();

        return $mostSelleds;
    }


    public function incomesYear($year)
    {
        $incomes = Order::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(total) as total')
        )->whereYear('created_at', $year)
            ->where('payment_status', 1)
            ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
            ->orderBy('year')
            ->orderBy('month')
            ->get();
        return $incomes;
    }

    public function incomes($dateStart, $dateEnd)
{
    $incomes = Order::select(
            DB::raw('DATE(created_at) as order_date'),
            DB::raw('SUM(total) as total'),
            DB::raw('DAY(created_at) as day')
        )
        ->whereBetween('created_at', [$dateStart, $dateEnd])
        ->where('payment_status', 1)
        ->groupBy('order_date', 'day')
        ->orderBy('order_date', 'asc')
        ->get();

    return $incomes;
}


    public function expensivesYear($year)
    {
        $expensives = Inventary::select(
            DB::raw('YEAR(buying_date) as year'),
            DB::raw('MONTH(buying_date) as month'),
            DB::raw('SUM(buying_price) as total_amount')
        )
            ->whereYear('buying_date', $year)
            ->groupBy(DB::raw('YEAR(buying_date)'), DB::raw('MONTH(buying_date)'))
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return $expensives;
    }

    public function expensives($dateStart, $dateEnd)
    {
        $expensives = Inventary::select(
            'buying_date',
            DB::raw('SUM(buying_price) as total_amount'),
            DB::raw('DAY(buying_date) as day')
        )
            ->whereBetween('buying_date', [$dateStart, $dateEnd])
            ->groupBy('buying_date')
            ->orderBy('buying_date', 'asc')
            ->get();

        return $expensives;
    }

    public function usersYear($year)
    {
        $users = User::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total_users')
        )
            ->whereYear('created_at', $year)
            ->where('is_admin', 0)
            ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
            ->orderByRaw('year, month')
            ->get();

        return $users;
    }



    public function users($dateStart, $dateEnd)
    {
        $users = User::select(
            DB::raw('DATE(created_at) as date_registered'),
            DB::raw('DAY(created_at) as day'),
            DB::raw('COUNT(*) as total_users')
        )
            ->whereBetween('created_at', [$dateStart, $dateEnd])
            ->where('is_admin', 0)
            ->groupBy('date_registered', 'day')
            ->orderBy('date_registered', 'asc')
            ->get();

        return $users;
    }


    public function ordersYear($year)
    {
        $orders = Order::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total_orders')
        )
            ->whereYear('created_at', $year)
            ->where('payment_status', 1)
            ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
            ->orderByRaw('year, month')
            ->get();

        return $orders;
    }
    public function orders($dateStart, $dateEnd)
    {
        $orders = Order::select(
            DB::raw('DATE(created_at) as order_date'),
            DB::raw('DAY(created_at) as day'),
            DB::raw('COUNT(*) as total_orders')
        )
            ->whereBetween('created_at', [$dateStart, $dateEnd])
            ->where('payment_status', 1)
            ->groupBy('order_date', 'day')
            ->orderBy('order_date', 'asc')
            ->get();

        return $orders;
    }
}
