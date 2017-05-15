<div id="lightBreaker">

</div>

<script type="text/javascript">
    window.addEventListener('load', function() {
        var game = new Game()
        game.setLvl(<?php echo $data["game-data"] ?>)
        game.run()
    });
</script>
