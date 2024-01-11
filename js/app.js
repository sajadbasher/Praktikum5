// Dieses Event wird ausgelöst, sobald das DOM vollständig geladen ist.
document.addEventListener('DOMContentLoaded', (event) => {
    // Hole alle Elemente mit der Klasse 'kanban-card'.
    const cards = document.querySelectorAll('.kanban-card');
    // Hole alle Elemente mit der Klasse 'kanban-column'.
    const columns = document.querySelectorAll('.kanban-column');

    // Füge jedem Karten-Element Event-Listener für Drag-Start und Drag-End hinzu.
    cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });

    // Definiert, was beim Start des Ziehens passieren soll.
    function dragStart(e) {
        // Setzt die übertragene Datenart und den Wert (hier die ID der Karte).
        e.dataTransfer.setData('text/plain', e.target.id);
        // Kurz verzögert, um die Karte zu verstecken, damit sie nicht direkt unter dem Cursor erscheint.
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    // Definiert, was geschieht, wenn das Ziehen (Drag) beendet wird.
    function dragEnd(e) {
        // Entfernt die Klasse 'hide', um die Karte wieder anzuzeigen.
        e.target.classList.remove('hide');
    }

    // Fügt jedem Spalten-Element Event-Listener für verschiedene Drag-Events hinzu.
    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    });

    // Verhindert das Standardverhalten des Browsers für das 'dragover'-Event.
    function dragOver(e) {
        e.preventDefault();
    }

    // Definiert, was beim Eintreten in das Drop-Ziel passiert (wenn die Karte über einer Spalte schwebt).
    function dragEnter(e) {
        e.preventDefault(); // Verhindert das Standardverhalten.
        e.target.classList.add('drag-over'); // Fügt eine Klasse hinzu, um das Drop-Ziel zu highlighten.
    }

    // Definiert, was geschieht, wenn die Karte das Drop-Ziel verlässt.
    function dragLeave(e) {
        e.target.classList.remove('drag-over'); // Entfernt das Highlighting vom Drop-Ziel.
    }

    // Definiert, was geschieht, wenn die Karte in einem Drop-Ziel abgelegt wird.
    function drop(e) {
        // Verhindert das Standardverhalten des Browsers für das 'drop'-Event.
        e.preventDefault();
        // Holt die ID der gezogenen Karte aus den übertragenen Daten.
        const id = e.dataTransfer.getData('text/plain');
        // Holt das Karten-Element basierend auf seiner ID.
        const card = document.getElementById(id);
        // Entfernt das Highlighting vom Drop-Ziel.
        e.target.classList.remove('drag-over');

        // Überprüft, ob das Drop-Ziel eine Karte ist, und fügt die gezogene Karte entsprechend ein.
        if (e.target.className === 'kanban-card') {
            // Wenn das Ziel eine Karte ist, füge die gezogene Karte direkt vor dieser Karte ein.
            e.target.parentNode.insertBefore(card, e.target);
        } else {
            // Wenn das Ziel keine Karte ist (also eine Spalte), füge die gezogene Karte als letztes Kind der Spalte hinzu.
            e.target.appendChild(card);
        }
    }
});
