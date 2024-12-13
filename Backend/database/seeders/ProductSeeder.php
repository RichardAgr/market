<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 1000; $i++) {
            DB::table('products')->insert([
                'name' => $faker->name,
                'code' => "000".$i,
                'description' => $faker->text,
                'price' => $faker->numberBetween(1, 200),
                'stock' => $faker->numberBetween(1, 300),
                'brand' => $faker->word,
                'provider' => $faker->word,
                'image' => $faker->imageUrl(),
                'category_id' => $faker->numberBetween(1, 100),
                'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
