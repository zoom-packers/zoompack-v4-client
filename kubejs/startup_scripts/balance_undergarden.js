let armor_pieces = ['helmet', 'chestplate', 'leggings', 'boots'];
let modifications_map = [
    {
        'material': 'cloggrum',
        'piece' : 'helmet',
        'armor' : 12,
        'armor_t' : 9,
        'knock_r' : 0.045,
        'durability' : 2300
    },
    {
        'material': 'cloggrum',
        'piece' : 'chestplate',
        'armor' : 22,
        'armor_t' : 9,
        'knock_r' : 0.045,
        'durability' : 3335
    },
    {
        'material': 'cloggrum',
        'piece' : 'leggings',
        'armor' : 17,
        'armor_t' : 9,
        'knock_r' : 0.045,
        'durability' : 3105
    },
    {
        'material': 'cloggrum',
        'piece' : 'boots',
        'armor' : 12,
        'armor_t' : 9,
        'knock_r' : 0.045,
        'durability' : 2760
    },
    // Frossteel - besides durability all is hardcoded in jar
    {
        'material': 'froststeel',
        'piece' : 'helmet',
        'armor' : 14,
        'armor_t' : 9,
        'knock_r' : 0.05,
        'durability' : 2630
    },
    {
        'material': 'froststeel',
        'piece' : 'chestplate',
        'armor' : 24,
        'armor_t' : 9,
        'knock_r' : 0.05,
        'durability' : 3813
    },
    {
        'material': 'froststeel',
        'piece' : 'leggings',
        'armor' : 19,
        'armor_t' : 9,
        'knock_r' : 0.05,
        'durability' : 3550
    },
    {
        'material': 'froststeel',
        'piece' : 'boots',
        'armor' : 14,
        'armor_t' : 9,
        'knock_r' : 0.05,
        'durability' : 3156
    },
    // utherium
    {
        'material': 'utherium',
        'piece' : 'helmet',
        'armor' : 17,
        'armor_t' : 10,
        'knock_r' : 0.055,
        'durability' : 2890
    },
    {
        'material': 'utherium',
        'piece' : 'chestplate',
        'armor' : 27,
        'armor_t' : 10,
        'knock_r' : 0.055,
        'durability' : 4190
    },
    {
        'material': 'utherium',
        'piece' : 'leggings',
        'armor' : 22,
        'armor_t' : 10,
        'knock_r' : 0.055,
        'durability' : 3901
    },
    {
        'material': 'utherium',
        'piece' : 'boots',
        'armor' : 17,
        'armor_t' : 10,
        'knock_r' : 0.055,
        'durability' : 3468
    },


    // swords    
    {
        'material': 'cloggrum',
        'piece' : 'sword',
        'damage' : 60,
        'durability' : 3300
    },
    {
        'material': 'froststeel',
        'piece' : 'sword',
        'damage' : 70,
        'durability' : 3500
    },
    {
        'material': 'utherium',
        'piece' : 'sword',
        'damage' : 80,
        'durability' : 3700
    },
    {
        'material': 'forgotten',
        'piece' : 'sword',
        'damage' : 90,
        'durability' : 4100
    },

    // Tools
    {
        'material': 'cloggrum',
        'piece' : 'tool',
        'damage' : 50,
        'durability' : 3300
    },
    {
        'material': 'cloggrum',
        'piece' : 'battleaxe',
        'damage' : 80,
        'durability' : 3300
    },
    {
        'material': 'froststeel',
        'piece' : 'tool',
        'damage' : 60,
        'durability' : 3500
    },
    {
        'material': 'utherium',
        'piece' : 'tool',
        'damage' : 70,
        'durability' : 3700
    },
    {
        'material': 'forgotten',
        'piece' : 'tool',
        'damage' : 80,
        'durability' : 4100
    }
];

ItemEvents.modification( (event) => {
    // global.modifyModItems(event, modId, materialIds, durabilities, attackDamages, armorTotals, armorToughnessesTotals, armorDistributions, armorToughnessDistributions);
    
    // event.modify("undergarden:forgotten_battleaxe", item => {
    //     item.attackDamage = 200;
    // });

    // event.modify("undergarden:cloggrum_battleaxe", item => {
    //     item.attackDamage = 112;
    // });


    modifications_map.forEach(data => {
        if(armor_pieces.includes(data['piece'])){
            event.modify("undergarden:"+ data['material'] + "_" + data['piece'], item => {
                item.armorProtection = data['armor'];
                item.armorToughness = data['armor_t'];
                item.armorKnockbackResistance = data['knock_r'];
                item.maxDamage = data['durability'];
            });
        }
        else if (data['piece']==='sword'){
            event.modify("undergarden:"+ data['material'] + "_" + data['piece'], item => {
                item.attackDamage = data['damage'];
                item.maxDamage = data['durability'];
            });
        }
        else if (data['piece']==='tool'){
            ['pickaxe', 'axe', 'shovel', 'hoe'].forEach(piece=>{
                event.modify("undergarden:"+ data['material'] + "_" + piece, item => {
                    item.maxDamage = data['durability'];
                });
            });
            
        }
    });
});
