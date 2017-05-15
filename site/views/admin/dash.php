
<div class="adminDash">
    <div class="left">
        <form action="/admin/add" method="post">
            <h1>Új Játék Felvétele</h1>
            <input type="text" name="name" placeholder="Az új játék neve" ><br>
            <input type="text" name="hits" placeholder="Minimum találatok száma" ><br>
            <label for="difficult">Szint:</label>
            <select name="difficult">
                <option value="Könnyü">Könnyű</option>
                <option value="Közepes">Közepes</option>
                <option value="Nehéz">Nehéz</option>
            </select><br>
            <div class="lvl">
                <div class="lvl-raw">
                    <textarea id="lvl-helper-raw" name="lvl" rows="10" ></textarea>
                </div>
                <div class="lvl-helper">
                    <h2>Kitöltés Segítő</h2>
                    <table>
                        <tr>
                            <td>Hova kerüljön</td>
                            <td>
                                <select id="lvl-helper-where">
                                    <option value="Field">Játék mező</option>
                                    <option value="Parking">Parkoló</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Pozició</td>
                            <td>
                                <input id="lvl-helper-col" type="number" placeholder="Oszlop" min="1" max="5">
                                <br>
                                <input id="lvl-helper-row" type="number" placeholder="Sor" min="1" max="5">
                            </td>
                        </tr>
                        <tr>
                            <td>Irány</td>
                            <td><input id="lvl-helper-heading" type="number" placeholder="Írány (0,90,180,270)" min="0" max="270" step="90"></td>
                        </tr>
                        <tr>
                            <td>Típus</td>
                            <td>
                                <select id="lvl-helper-type">
                                    <option value="Laser">Lézer</option>
                                    <option value="Blocker">Blokkoló</option>
                                    <option value="CheckPoint">Ellenorző pont</option>
                                    <option value="DoubleMirror">Dupla tükör</option>
                                    <option value="HalfMirror">Féligáteresztő tükör</option>
                                    <option value="Mirror">Tükör</option>
                                    <option value="Target">Cél</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Mozgatható</td>
                            <td><input id="lvl-helper-movable" type="checkbox"></td>
                        </tr>
                        <tr>
                            <td>Forgatható</td>
                            <td><input id="lvl-helper-rotatable" type="checkbox"></td>
                        </tr>
                    </table>
                    <input id="lvl-helper-add" type="button" value="Hozzáad">
                </div>
            </div>
            <br>
            <input type="submit" name="" value="Felvétel!">
        </form>

    </div>
    <div class="datagrid right">
        <table>
            <thead>
                <tr>
                    <th class="name">Név</th>
                    <th>Nehézségi Szint</th>
                    <th>Összes megoldás</th>
                    <th>Funkciók</th>
                </tr>
            </thead>
            <tbody>
            <?php
                foreach ($data["games"] as $game) {
                    ?>
                    <tr>
                        <td><a href="/game/<?php echo $game["id"];?> "><?php echo $game["name"] ?></a></td>
                        <td><?php echo $game["difficult"] ?></td>
                        <td></td>
                        <td><a href="/admin/delete/<?php echo $game["id"];?>"><img src="/img/Letter-X-icon.png" alt="Delete"></a></td>
                    </tr>
                    <?php
                }
            ?>
            </tbody>
        </table>
    </div>
</div>
