        const transaktionForm = document.getElementById('transaktionForm');
        const transaktionsListe = document.getElementById('transaktionsListe');
        const textInput = document.getElementById('text');
        const transaktionInput = document.getElementById('transaktion');
        const gesamtbetragElement = document.getElementById('gesamtbetrag');

        // Funktion zur Datenwiederherstellung aus localStorage
        function restoreData() {
            const savedData = localStorage.getItem('transaktionen');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                transaktionen.push(...parsedData);
                updateTransaktionsListe();
                updateGesamtbetrag();
            }
        }

        // Array zur Speicherung der Transaktionen
        const transaktionen = [];

        // Daten bei Laden der Seite wiederherstellen
        restoreData();

        transaktionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Werte aus den Eingabefeldern abrufen
            const text = textInput.value;
            const transaktion = parseFloat(transaktionInput.value);

            // Transaktion zum Array hinzufügen
            transaktionen.push({ text, transaktion });

            // Transaktionsliste aktualisieren
            updateTransaktionsListe();

            // Gesamtbetrag aktualisieren
            updateGesamtbetrag();

            // Daten in localStorage speichern
            localStorage.setItem('transaktionen', JSON.stringify(transaktionen));

            // Eingabefelder leeren
            textInput.value = '';
            transaktionInput.value = '';
        });

        function updateTransaktionsListe() {
            // Transaktionsliste leeren
            transaktionsListe.innerHTML = '';

            // Transaktionen durchlaufen und zur Liste hinzufügen
            transaktionen.forEach(function (transaktion) {
                const row = document.createElement('tr');
                const beschreibungCell = document.createElement('td');
                beschreibungCell.textContent = transaktion.text;
                const kostenCell = document.createElement('td');
                kostenCell.textContent = transaktion.transaktion;
                row.appendChild(beschreibungCell);
                row.appendChild(kostenCell);
                transaktionsListe.appendChild(row);
            });
        }

        function updateGesamtbetrag() {
            // Gesamtbetrag berechnen und aktualisieren
            const gesamtbetrag = transaktionen.reduce((sum, transaktion) => sum + transaktion.transaktion, 0);
            gesamtbetragElement.textContent = `Gesamtbetrag: ${gesamtbetrag}`;
        }
