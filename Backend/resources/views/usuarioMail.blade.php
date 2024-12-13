<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promoción en Urban Market</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
            color: #333;
            text-align: center;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        .promo-info {
            background-color: #ffcc00;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Productos en promoción en Urban Market</h2>
        <ul>
            <li>Estimado cliente, conozca los productos en promoción de nuestro mercado.</li>
            <li class="promo-info">¡Tenemos la PROMOCIÓN <strong>{{ $info->name }}</strong>!</li>
            <li><em>¡IMPERDIBLE!</em> {{ $info->description }}</li>
            <li><strong>¡Hasta agotar stock!</strong></li>
        </ul>
    </div>
</body>
</html>
