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

            const firstName = $('#first_name').val().trim();
            const lastName = $('#last_name').val().trim();
            const email = $('#email').val().trim();
            const treatment = $('#treatment-select').val();
            const date = $('#datepicker').val().trim();

            if (!firstName || !lastName || !email || !treatment || !date) {
                M.toast({
                    html: 'Brak wprowadzonych danych',
                    classes: 'red',
                    displayLength: 4000
                });
                return;
            }

            M.toast({
                html: 'Pomyślnie zarezerwowano',
                classes: 'black',
                displayLength: 4000
            });

            this.reset();
            $('#treatment-name').text('');
            $('#treatment-price').text('zł');
            $('#people-count').text('1');
            $('.people-btn').removeClass('active');
            $('.people-btn[data-people="1"]').addClass('active');
            $('#treatment-select').val('').formSelect();
        });

        const treatments = {
            'Zabieg relaksacyjny': { name: 'Zabieg relaksacyjny', prices: [199, 349, 549] },
            'Pakiet premium': { name: 'Pakiet premium', prices: [500, 900, 1300] },
            'Pielęgnacja skóry': { name: 'Pielęgnacja skóry', prices: [199, 375, 499] },
            'Pakiet dla każdego': { name: 'Pakiet dla każdego', prices: [175, 349, 599] },
            'Pakiet dla seniorów': { name: 'Pakiet dla seniorów', prices: [175, 250, 380] },
            'Pakiet dla mam': { name: 'Pakiet dla mam', prices: [350, 600, 949] }
        };

        let selectedPeople = 1;
        let selectedTreatment = null;
        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            minDate: new Date()
        });
        $('.people-btn').click(function (e) {
            e.preventDefault();
            $('.people-btn').removeClass('active');
            $(this).addClass('active');
            selectedPeople = parseInt($(this).data('people'));
            $('#people-count-input').val(selectedPeople);
            updateSummary();
        });
        $('#treatment-select').change(function () {
            selectedTreatment = $(this).val();
            updateSummary();
        });
        function updateSummary() {
            if (selectedTreatment && treatments[selectedTreatment]) {
                const treatment = treatments[selectedTreatment];
                let priceIndex;
                if (selectedPeople === 1) {
                    priceIndex = 0;
                } else if (selectedPeople === 2) {
                    priceIndex = 1;
                } else {
                    priceIndex = 2;
                }
                const price = treatment.prices[priceIndex];

                $('#treatment-name').text(treatment.name);
                $('#treatment-price').text(price + ' zł');
                $('#people-count').text(selectedPeople + (selectedPeople >= 3 ? '+' : ''));
            } else {
                $('#treatment-name').text('');
                $('#treatment-price').text('zł');
                $('#people-count').text('1');
            }
        }

        $('.people-btn[data-people="1"]').addClass('active');

        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }

        const urlTreatmentName = getUrlParameter('treatment');
        const urlTreatmentPrice = getUrlParameter('price');

        if (urlTreatmentName) {
            $('#treatment-select').val(urlTreatmentName);
            M.FormSelect.init($('#treatment-select'));

            selectedTreatment = urlTreatmentName;
            updateSummary();
        }

        M.AutoInit();
    });
})(jQuery);