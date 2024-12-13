<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class frequently_asked_questions extends Model
{
    use HasFactory;
    protected $table = 'frequently_asked_questions'; // Reemplaza con el nombre de tu tabla
    protected $fillable = ['title', 'answer']; // Asegúrate de listar todas las columnas que quieres recuperar
}

