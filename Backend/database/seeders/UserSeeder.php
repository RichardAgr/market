<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for($i = 0; $i < 200; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('password'),
                'city' => $faker->city,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
                'avatar' => $faker->imageUrl(),
                'is_admin' => $faker->boolean,
                'created_at' => $faker->dateTimeBetween('now', '+1 year'),
                'updated_at' => $faker->dateTimeBetween('now', '+1 year'),
            ]);
        }
    }
}
