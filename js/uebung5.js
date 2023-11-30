        const transaktionForm = document.getElementById('transaktionForm');
        const transaktionsListe = document.getElementById('transaktionsListe');
        const textInput = document.getElementById('text');
        const transaktionInput = document.getElementById('transaktion');
        const gesamtbetragElement = document.getElementById('gesamtbetrag');

        // Array zur Speicherung der Transaktionen
        const transaktionen = [];

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

            // Eingabefelder leeren
            textInput.value = '';
            transaktionInput.value = '';
        });

        function updateTransaktionsListe() {
            // Transaktionsliste leeren
            transaktionsListe.innerHTML = '';

            // Transaktionen durchlaufen und zur Liste hinzufügen
            transaktionen.forEach(function (transaktion) {
                const listItem = document.createElement('li');
                listItem.className = 'transaktionsEintrag';
                const beschreibung = document.createElement('div');
                beschreibung.className = 'beschreibung';
                beschreibung.textContent = `Beschreibung: ${transaktion.text}`;
                const transaktionssumme = document.createElement('div');
                transaktionssumme.textContent = `Transaktionssumme: ${transaktion.transaktion}`;
                listItem.appendChild(beschreibung);
                listItem.appendChild(transaktionssumme);
                transaktionsListe.appendChild(listItem);
            });
        }

        function updateGesamtbetrag() {
            // Gesamtbetrag berechnen und aktualisieren
            const gesamtbetrag = transaktionen.reduce((sum, transaktion) => sum + transaktion.transaktion, 0);
            gesamtbetragElement.textContent = `Gesamtbetrag: ${gesamtbetrag}`;
        }
