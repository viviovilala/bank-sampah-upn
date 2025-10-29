<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Daftar transaksi']);
    }

    public function store(Request $request)
    {
        // contoh simpan data
        return response()->json(['message' => 'Transaksi baru berhasil disimpan']);
    }
}
