<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class SelectionDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 500; $i++) {
            DB::table('selection_details')->insert([
                'order_id' => $faker->numberBetween(1, 1000),
                'product_id' => $faker->numberBetween(1, 1000),
                'quantity' => $faker->numberBetween(1, 200),
                'price_unit' => $faker->numberBetween(1, 500),
                'subtotal' => $faker->numberBetween(1, 1000),
                'discount' => $faker->numberBetween(1, 1000),
                'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
