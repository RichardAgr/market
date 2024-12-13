<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class FrequentlyAskedQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 30; $i++) {
            DB::table('frequently_asked_questions')->insert([
                'title' => $faker->paragraph(1),
                'answer' => $faker->text,
                'date' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'user_id' => $faker->numberBetween(1, 200),
                'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
