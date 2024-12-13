<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class NotificationSeeder extends Seeder
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
            DB::table('notifications')->insert([
                'message' => $faker->text,
                'date' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'user_id' => $faker->numberBetween(1, 200),
                'created_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('-1 year', '+1 year'),
            ]);
        }
    }
}
