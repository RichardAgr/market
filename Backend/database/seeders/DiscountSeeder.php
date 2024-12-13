<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 400; $i++) {
            $year = '+1 year';
            $startDate = $faker->dateTimeBetween('now', $year);
            $endDate = $faker->dateTimeBetween($startDate, $year);
            DB::table('discounts')->insert([
                'name' => "discount".$i,
                'description' => $faker->text,
                'type_discount' => $faker->boolean(),
                'value' => $faker->numberBetween(1, 200),
                'date_start' => $startDate,
                'date_end' => $endDate,
                'use_max' => $faker->numberBetween(1, 100),
                'created_at' => $faker->dateTimeBetween('now', $year),
                'updated_at' => $faker->dateTimeBetween('now', $year),
            ]);
        }
    }
}
