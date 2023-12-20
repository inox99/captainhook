Schiffe versenken

https://github.com/TaiSonRZR/captainhook
https://github.com/inox99/captainhook.git

Spielkonzept:

- es gibt eine Collection/Tabelle von Spielen (ShipMatchDv1 in shipmatch.js, xxDv1 heißt Datenobject Version 1)
- es gibt eine Collection/Tabelle von Spielern (registrierte Benutzer)
- bevor gespielt werden kann muss man sich anmelden
- nach der anmeldung kann man
   - neue spiele anlegen (begrenzt, Fake-prevent)
      bei einem neuen spiel (name player 1 erforderlich) werden 
      siehe unten 1. Entwurf const ShipMatchDv1

   - an einem spiel teilnehmen (existierendes spiel auswählen)
      an einem spiel teilnehmen kann man wenn der "player2" unbesetzt ist, dann wird man dort als "player2" eingetragen.
      => spieler wählt ein spiel, bei dem er "player1" oder "player2" ist
         => man kann auch gegen sich selbst spielen (warum auch nicht, gut zum testen)

1. Entwurf const ShipMatchDv1 = {
   ."id" : key des spiels in der DB, wird bei
   ."created": zeitpunkt der erstellung
   ."state":  (ShipMatchState)
      0 = neu angelegt von spieler_x
         spieler_x als "player1"."id" eingetragen
         - die "battlefield"s werden erstellen, array[[]] gemäß "dim" und mit 0 besetzt
   (
   ."shotcounter": 0,  zählt die schüsse, damit kann man auch ein "OutOfSync" feststellen, 
   ."turn": 
      0 gibt an welcher spieler am zug ist (0 = keiner, 1 = spieler1, 2 = spieler2)
      shootcounter und turn könnte man auch als funktion implementieren
   )
   const ShipMatchState = {
      init: 0,
      waitforready: 0, (bit 0: p1-ready, bit 1: p2-ready => waitforready: 3, beide ready, dann könnte man in status running setzen)
      running: 2,
      canceled: -1,
      finished: 1
   }
}
2. Verlauf
   - ohne anmeldung geht nichts (ausser Werbung ;-)
   - Anmeldung (zb email/passwort)
   - Spiele auflisten 
      (an dem der angemeldete spieler beteiligt ist, also als "player1"."id" oder "player2"."id" eingetragen ist),
      und/oder "player2"."id" noch leer ist

   - spiel hat anfangs "state": 0 (ShipMatchState.init)
      - ein spiel kann gecanceled werden, von einem eingetragenen Spieler, dann wir es gelöscht 
         (könnte auch während dem spiel passieren)
      - ein spiel ist/wird beendet, wenn von einem Spieler alle schiffe versenkt wurden 
         => "state" = ShipMatchState.finished
         => "turn" = 0

   - Spiel auswählen (siehe Spiele auflisten)
      => "ShipMatchDv1"."id" wird geladen
      "state"= 0 (ShipMatchState.init)
         => spieler kann schiffe positionieren
         sind alle Schiffe (gültig) positioniert, kann der Spieler das Spiel aktivieren
         haben beide aktiviert ShipMatchState.
            => ShipMatchState.p1ready & ShipMatchState.p2ready (=ShipMatchState.running)
               und ."turn" (=0) wird 1 oder 2 ausgehandel, also wer am Zug (Schuss) ist
         dann wird wechselseitig geschossen, bis in einem "battlefield" alle schiffe versenkt sind
            => "state" = ShipMatchState.finished,
               "turn" = 0
            und es gibt einen Sieger (Statistiken? gewonnene/verlorene spiele, Schusszahl, Zeiten messen, und und und )
            oder das Spiel abgebrochen wird "state" = ShipMatchState.canceled

3. Die class ShipMatch

4. class Player
      // erleichtert den Zugriff auf die Soieldaten aus Sicht des jeweiligen Spielers
      ownField // das eigene Spielfeld
      oppField // das gegnerische Spielfeld
      shoot(x, y) //spieler gibt einen Schuss ab, mit Koordinaten