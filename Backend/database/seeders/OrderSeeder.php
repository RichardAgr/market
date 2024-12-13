<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class OrderSeeder extends Seeder
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
            DB::table('orders')->insert([
                 'order_code' => "000".$i,
                 'name' => $faker->name,
                 'total' => $faker->numberBetween(1, 200),
                 'user_id' => $faker->numberBetween(1, 200),
                 'product_amount' => $faker->numberBetween(1, 40),
                 'payment_status' => $faker->boolean(),
                 'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                 'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
