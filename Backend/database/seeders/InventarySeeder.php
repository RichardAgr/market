<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class InventarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 200; $i++) {
            DB::table('inventories')->insert([
                'buying_price' => $faker->numberBetween(1, 200),
                'buying_date' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'buying_amount' => $faker->numberBetween(1, 200),
                'product_id' => $faker->numberBetween(1, 200),
                'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
