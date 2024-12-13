<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use DateTime;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = Product::all();

        foreach ($productos as $producto) {
            $rutaImagen = storage_path("app/" . $producto->image);
            
            if (file_exists($rutaImagen)) {
                $imagenBase64 = base64_encode(file_get_contents($rutaImagen));
                $producto->imagen_base64 = $imagenBase64;
            } else {
                $producto->imagen_base64 = $rutaImagen; 
            }
        }

        return response()->json( $productos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) //POST -> endpoint
    {   
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images');
            $productPath = 'images/' . basename($imagePath);
        } else {
            $defaultImagePath = 'images/producto-sin-imagen.png';
            $productPath = Storage::url($defaultImagePath);
        }
        $product = new Product;
        $product -> name = $request -> name;
        $product -> code = $request -> code;
        $product -> description = $request -> description;
        $product -> price = $request -> price;
        $product -> stock = $request -> stock;
        $product -> brand = $request -> brand;
        $product -> provider = $request -> provider;
        $product->image = $productPath;
        $product -> category_id = $request -> category_id;
        $product->save();
                return response()->json(['message' => 'Product created successfully'], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product = Product::find($id);
        if ($product == null)
        {
            return response()->json([
                'error' => 'No se encontraron eventos con ese ID.',
            ], 404);
        }
        //$product = $this->translateProduct($product);
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
    private function translateProduct($product)
    {
        $product->requisitos = $this->stringToArray($evento->requisitos);
        $product->premios = $this->stringToArray($evento->premios);
        $product->contactos = $this->stringToArray($evento->contactos);

        if ($evento->afiche == null)
            return $evento;

        $evento->afiche = $this->getImageURL($evento->id);
        return $evento;
    }
    public function getProducts($rowsPerPage,$productsType)
    {
        $query = Product::with(['promotions.discount']);

        if ($productsType === 'IN_OFFER') {
            $query->has('promotions');
        } elseif ($productsType === 'NO_OFFER') {
            $query->doesntHave('promotions');
        }
        $products = $query->paginate($perPage = $rowsPerPage, $columns = ['*'], $pageName = 'products');

        return response()->json($products);
    }
}
