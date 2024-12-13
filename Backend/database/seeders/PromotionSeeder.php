<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class PromotionSeeder extends Seeder
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
            DB::table('promotions')->insert([
              'product_id' => $faker->numberBetween(1, 1000),
              'discount_id' => $faker->numberBetween(1, 400),
              'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
              'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
