(function ($) {

    $(document).ready(function () {
        $('#contact_form').submit(function (e) {
            e.preventDefault();
            M.toast({
                html: 'Wysłano wiadomość',
                classes: 'black',
                displayLength: 4000
            });
            this.reset();
        });
        $('#reservation-form').submit(function (e) {
            e.preventDefault();
            M.toast({
                html: 'Pomyślnie zarezerwowano',
                classes: 'black',
                displayLength: 4000
            });
            this.reset();
        });
    });
    const treatments = {
        'relax': {name: 'Zabiegi relaksacyjne', prices: [199, 349, 549]},
        'premium': {name: 'Pakiety premium', prices: [500, 900, 1300]},
        'skin': {name: 'Pielęgnacja skóry', prices: [199, 375, 499]},
        'basic': {name: 'Pakiety dla każdego', prices: [175, 349, 599]},
        'mom': {name: 'Dla mam', prices: [350, 600, 949]}
    };

    // Inicjalizacja
    $(document).ready(function () {
        $('.datepicker').datepicker();

        let selectedPeople = 1;
        let selectedTreatment = null;

        // Obsługa wyboru ilości osób
        $('.people-btn').click(function (e) {
            e.preventDefault();
            $('.people-btn').removeClass('active');
            $(this).addClass('active');
            selectedPeople = parseInt($(this).data('people'));
            updateSummary();
        });

        // Obsługa wyboru zabiegu
        $('#treatment-select').change(function () {
            selectedTreatment = $(this).val();
            updateSummary();
        });

        // Funkcja aktualizująca podsumowanie
        function updateSummary() {
            if (selectedTreatment) {
                const treatment = treatments[selectedTreatment];
                const peopleIndex = selectedPeople >= 3 ? 2 : selectedPeople - 1;
                const price = treatment.prices[peopleIndex];

                $('#treatment-name').text(treatment.name);
                $('#treatment-price').text(price + ' zł');
                $('#people-count').text(selectedPeople + (selectedPeople >= 3 ? '+' : ''));
            }
        }

        // Inicjalizacja pierwszego przycisku osób
        $('.people-btn[data-people="1"]').addClass('active');
    });
})(jQuery);