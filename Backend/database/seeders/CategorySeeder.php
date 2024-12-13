<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 100; $i++) {
            DB::table('categories')->insert([
                'name' => $faker->name,
                'detail' => $faker->paragraph(1),
                'icon' => $faker->imageUrl(),
                'category_parent_id' => $faker->boolean(50) ? $faker->numberBetween(1, 200) : null,
                'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
