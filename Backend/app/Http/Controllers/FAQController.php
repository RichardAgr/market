<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\frequently_asked_questions;
use Illuminate\Http\Request;

class FAQController extends Controller
{


    public function store(Request $request)
    {
        try {
            $faq = new frequently_asked_questions();

            $faq->title = $request->title;
            $faq->answer = $request->answer;
            $faq->date= now();
            $faq->user_id= $request->user_id;
            $faq->save();
            
            return response()->json(['mensaje' => 'Pregunta frecuente creada exitosamente', 'error' => false]);
        } catch (\Exception $e) {
            if ($e instanceof QueryException) {
                if ($e->errorInfo[1] == 1062) {
                    return response()->json(['mensaje' => 'La pregunta frecuente ya existe', 'error' => true]);
                } elseif ($e->errorInfo[1] == 1048) {
                    return response()->json(['mensaje' => 'Error: No se ha proporcionado un campo necesario', 'error' => true]);
                }
            }
            
            return response()->json(['mensaje' => 'Error desconocido: ' . $e->getMessage(), 'error' => true]);
        }
    }
    public function getFaq()
    {
        try {   
            $faqs = frequently_asked_questions::all();

            return response()->json(['faqs' => $faqs]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error desconocido: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request,$id){
        try {
            $faq =  frequently_asked_questions::find($id );

            $faq->title = $request->title;
            $faq->answer = $request->answer;
            $faq->date= now();
            $faq->save();
            
            return response()->json(['mensaje' => 'Pregunta frecuente creada exitosamente', 'error' => false]);
        } catch (\Exception $e) {
            if ($e instanceof QueryException) {
                if ($e->errorInfo[1] == 1062) {
                    return response()->json(['mensaje' => 'La pregunta frecuente ya existe', 'error' => true]);
                } elseif ($e->errorInfo[1] == 1048) {
                    return response()->json(['mensaje' => 'Error: No se ha proporcionado un campo necesario', 'error' => true]);
                }
            }
            
            return response()->json(['mensaje' => 'Error desconocido: ' . $e->getMessage(), 'error' => true]);
        }
    }

    public function delete($id)
    {
        try {
            $faq =frequently_asked_questions::find($id);
            $faq->delete();
            return response()->json(['mensaje' => 'Eliminado exitosamente', 'error' => false]);
        } catch (QueryException $e) {
            return $e->getMessage();
        }
    }
}
