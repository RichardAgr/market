<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            UserSeeder::class,
            ProductSeeder::class,
            DiscountSeeder::class,
            PromotionSeeder::class,
            NotificationSeeder::class,
            InventarySeeder::class,
            FrequentlyAskedQuestionSeeder::class,
            OrderSeeder::class,
            SelectionDetailSeeder::class
        ]);
    }
}
