new Vue({
    el : "#app",
    data : {
        player_hp : 100,
        monster_hp : 100,
        is_game_started : false,
        game_logs : [],
        log_texts : {
            player_side : 'Player',
            monster_side : 'Monster',
            player_attack : 'Player attack damage to monster : ',
            monster_attack : 'Monster attack damage to player : ',
            player_special_attack : 'Player special attack damage to monster : ',
            player_heal_up : 'Player healed up by : ',
            give_up : 'Player gave up!',
        },
        player_attack_multiplier : 10,
        monster_attack_multiplier : 15,
        player_special_attack_multiplier : 25,
        player_heal_up_multiplier : 20,
    },
    methods : {
        start_game : function () {
            this.is_game_started = true;
        },
        attack : function() {
            let attack_points = Math.ceil(Math.random() * this.player_attack_multiplier);
            this.monster_hp -= attack_points;
            this.monster_attack();
            this.add_to_log({
                side : this.log_texts.player_side,
                message : this.log_texts.player_attack + attack_points,
            });
        },
        special_attack : function () {
            let attack_points = Math.ceil(Math.random() * this.player_special_attack_multiplier);
            this.monster_hp -= attack_points;
            this.monster_attack();
            this.add_to_log({
                side : this.log_texts.player_side,
                message : this.log_texts.player_special_attack + attack_points,
            });
        },
        heal_up : function () {
            let heal_points = Math.ceil(Math.random() * this.player_heal_up_multiplier);
            this.player_hp += heal_points;
            this.monster_attack();
            this.add_to_log({
                side : this.log_texts.player_side,
                message : this.log_texts.player_heal_up + heal_points,
            });
        },
        give_up : function () {
            this.add_to_log({
                side : this.log_texts.player_side,
                message : this.log_texts.give_up,
            });
            this.player_hp = 0;
            this.is_game_started = false;
        },
        monster_attack : function () {
            let attack_points = Math.ceil(Math.random() * this.monster_attack_multiplier);
            this.player_hp -= attack_points;
            this.add_to_log({
                side : this.log_texts.monster_side,
                message : this.log_texts.monster_attack + attack_points,
            });
        },
        add_to_log : function (log) {
            this.game_logs.push(log);
        },
        reset_log : function () {
            this.game_logs = [];
        }
    },
    watch : {
        player_hp : function (value) {
            if (value <= 0) {
                this.player_hp = 0;
                if(confirm("You LOST! Would you like to play again?")) {
                    this.player_hp = 100;
                    this.monster_hp = 100;
                    this.reset_log();
                }
            }
            else if (value >= 100) {
                this.player_hp = 100;
            }
        },
        monster_hp : function (value) {
            if (value <= 0) {
                this.monster_hp = 0;
                if(confirm("You WON! Would you like to play again?")) {
                    this.player_hp = 100;
                    this.monster_hp = 100;
                    this.reset_log();
                }
            }
        },
    },
    computed : {
        player_health_bar : function () {
            return {
                width : this.player_hp + '%',
            }
        },
        monster_health_bar : function () {
            return {
                width : this.monster_hp + '%',
            }
        },
    }
});