<div class="datagrid">
    <table>
        <thead>
            <tr>
                <th>Név</th>
                <th>Nehézségi Szint</th>
                <th>Teljesítetted</th>
                <th>Összes megoldás</th>
            </tr>
        </thead>
        <tbody>
        <?php
            foreach ($data["games"] as $game) {
                ?>
                <tr>
                    <td><a href="/game/<?php echo $game["id"];?> "><?php echo $game["name"] ?></a></td>
                    <td><?php echo $game["difficult"] ?></td>
                    <td><?php echo $game["user_solved"] ? "&#10003" : "&#10007" ?></td>
                    <td><?php echo $game["solves"] ?></td>
                </tr>
                <?php
            }
        ?>
        </tbody>
    </table>
</div>
