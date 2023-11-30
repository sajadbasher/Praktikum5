        const transaktionForm = document.getElementById('transaktionForm');
        const transaktionsListe = document.getElementById('transaktionsListe');
        const budgetInput = document.getElementById('budget');
        const textInput = document.getElementById('text');
        const transaktionInput = document.getElementById('transaktion');

        // Array zur Speicherung der Transaktionen
        const transaktionen = [];

        transaktionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Werte aus den Eingabefeldern abrufen
            const budget = parseFloat(budgetInput.value);
            const text = textInput.value;
            const transaktion = parseFloat(transaktionInput.value);

            // Transaktion zum Array hinzufügen
            transaktionen.push({ text, transaktion });

            // Transaktionsliste aktualisieren
            updateTransaktionsListe();

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
                listItem.textContent = `${transaktion.text}: ${transaktion.transaktion}`;
                transaktionsListe.appendChild(listItem);
            });
        }
