<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StateSeeder extends Seeder
{
    public function run()
    {
        $states = [
            [
                'country_code' => 'FI',
                'code' => '01',
                'translations' => [
                    'en' => 'Åland',
                    'fi' => 'Ahvenanmaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '02',
                'translations' => [
                    'en' => 'Southern Ostrobothnia',
                    'fi' => 'Etelä-Pohjanmaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '03',
                'translations' => [
                    'en' => 'Southern Savonia',
                    'fi' => 'Etelä-Savo',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '04',
                'translations' => [
                    'en' => 'Kainuu',
                    'fi' => 'Kainuu',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '05',
                'translations' => [
                    'en' => 'Tavastia Proper',
                    'fi' => 'Kanta-Häme',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '06',
                'translations' => [
                    'en' => 'Central Ostrobothnia',
                    'fi' => 'Keski-Pohjanmaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '07',
                'translations' => [
                    'en' => 'Central Finland',
                    'fi' => 'Keski-Suomi',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '08',
                'translations' => [
                    'en' => 'Kymenlaakso',
                    'fi' => 'Kymenlaakso',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '09',
                'translations' => [
                    'en' => 'Lapland',
                    'fi' => 'Lappi',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '10',
                'translations' => [
                    'en' => 'Pirkanmaa',
                    'fi' => 'Pirkanmaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '11',
                'translations' => [
                    'en' => 'Ostrobothnia',
                    'fi' => 'Pohjanmaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '12',
                'translations' => [
                    'en' => 'Northern Ostrobothnia',
                    'fi' => 'Pohjois-Pohjanmaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '13',
                'translations' => [
                    'en' => 'Northern Savonia',
                    'fi' => 'Pohjois-Savo',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '14',
                'translations' => [
                    'en' => 'Northern Karelia',
                    'fi' => 'Pohjois-Karjala',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '15',
                'translations' => [
                    'en' => 'Satakunta',
                    'fi' => 'Satakunta',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '16',
                'translations' => [
                    'en' => 'Uusimaa',
                    'fi' => 'Uusimaa',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '17',
                'translations' => [
                    'en' => 'Päijänne Tavastia',
                    'fi' => 'Päijät-Häme',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '18',
                'translations' => [
                    'en' => 'South Karelia',
                    'fi' => 'Etelä-Karjala',
                ],
            ],
            [
                'country_code' => 'FI',
                'code' => '19',
                'translations' => [
                    'en' => 'Varsinais-Suomi',
                    'fi' => 'Varsinais-Suomi',
                ],
            ],
        ];
        

        foreach ($states as $state) {
            $country = DB::table('countries')->where('code', $state['country_code'])->first();
        
            if ($country) {
                $stateId = DB::table('states')->insertGetId([
                    'country_id' => $country->id,
                    'code' => $state['code'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
        
                foreach ($state['translations'] as $locale => $name) {
                    DB::table('state_translations')->insert([
                        'state_id' => $stateId,
                        'locale' => $locale,
                        'name' => $name,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
        
    }
}
