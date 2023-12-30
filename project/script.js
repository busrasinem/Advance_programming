function saveToLocalStorage() {
    const tableRows = document.querySelectorAll('#table_body tr'); // Tablodaki tüm satırları al

    const data = [];

    tableRows.forEach(row => {
        const rowData = {
            nameSurname: row.querySelector('td:nth-child(1)').textContent,
            email: row.querySelector('td:nth-child(2)').textContent,
            phone: row.querySelector('td:nth-child(3)').textContent,
            q1Grade: row.querySelector('td:nth-child(4)').textContent,
            midtermGrade: row.querySelector('td:nth-child(5)').textContent,
            q2Grade: row.querySelector('td:nth-child(6)').textContent,
            projectGrade: row.querySelector('td:nth-child(7)').textContent,
            finalGrade: row.querySelector('td:nth-child(8)').textContent
        };

        data.push(rowData); // Her satırın verisini data dizisine ekle
    });
    // Elde edilen verileri JSON formatına dönüştürerek local storage'a kaydet
    localStorage.setItem('tableData', JSON.stringify(data));

    console.log(data)
}

// Sayfa yüklendiğinde local storage'dan verileri yükle
window.onload = loadFromLocalStorage;

function loadFromLocalStorage() {
    const storedData = localStorage.getItem('tableData');

    if (storedData) {
        const parsedData = JSON.parse(storedData);

        const tableBody = document.getElementById('table_body');

        // Kayıtlı verileri tabloya yerleştirme
        parsedData.forEach(dataItem => {
            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td>${dataItem.nameSurname || ''}</td>
                <td>${dataItem.email || ''}</td>
                <td>${dataItem.phone || ''}</td>
                <td>${dataItem.q1Grade || ''}</td>
                <td>${dataItem.midtermGrade || ''}</td>
                <td>${dataItem.q2Grade || ''}</td>
                <td>${dataItem.projectGrade || ''}</td>
                <td>${dataItem.finalGrade || ''}</td>
                <td>
                    <button class="danger" onclick="remove_tr(this)">
                        <i class="fa fa-close"></i>
                    </button>
                    <button class="edit" onclick="edit_tr(this)">
                        <i class="fa fa-pencil"></i>
                    </button>
                </td>
            `;

            tableBody.appendChild(newRow); // Yeni satırı tabloya ekle
        });
    }
}

function validateGrade(input) {
    if (input.value > 100) {
        input.value = 100;
    }
    if (input.value < 0) {
        input.value = 0;
    }
}

function addDataToTable() {
    const nameSurname = document.querySelector('.nameSurname').value;
    const email = document.querySelector('.email').value;
    const phone = document.querySelector('.phone').value;
    const q1Grade = document.querySelector('.q1Grade').value;
    const midtermGrade = document.querySelector('.midtermGrade').value;
    const q2Grade = document.querySelector('.q2Grade').value;
    const projectGrade = document.querySelector('.projectGrade').value;
    const finalGrade = document.querySelector('.finalGrade').value;

    // İsim ve soyisimde sayı olmadığını kontrol et
    if (/\d/.test(nameSurname)) {
        alert('Name or surname cannot contain numbers!');
        return;
    }

    // Emailin @stu.fsm içerip içermediğini kontrol et
    if (!email.endsWith('@stu.fsm')) {
        alert('Enter a valid @stu.fsm email address!');
        return;
    }

    // Telefon numarası kontrolü (+90 ile başlamalı)
    const phonePattern = /^\+90[0-9]{10}$/; // +90 ile başlayan 10 haneli telefon numarası kontrolü
    if (!phonePattern.test(phone)) {
        alert("Phone number must start with +90 and have 10 digits after that!");
        return; // Formun gönderilmesini engelle
    }

    // Tüm inputları kontrol et, herhangi biri boşsa ekleme yapma
    if (
        !nameSurname ||
        !email ||
        !phone ||
        !q1Grade ||
        !midtermGrade ||
        !q2Grade ||
        !projectGrade ||
        !finalGrade
    ) {
        alert('Tüm alanları doldurmalısınız!');
        return; // Eğer bir alan boşsa fonksiyonu burada sonlandır
    }

    const tableBody = document.getElementById('table_body');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nameSurname}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${q1Grade}</td>
        <td>${midtermGrade}</td>
        <td>${q2Grade}</td>
        <td>${projectGrade}</td>
        <td>${finalGrade}</td>
        <td>
                <button class="danger" onclick="remove_tr(this)">
                    <i class="fa fa-close"></i>
                </button>
                <button class="edit" onclick="edit_tr(this)">
                    <i class="fa fa-pencil"></i>
                </button>
        </td>
    `;

    tableBody.appendChild(newRow);

    // Verileri local storage'a kaydet
    saveToLocalStorage();

    // Inputlardaki verileri temizle
    document.querySelector('.nameSurname').value = '';
    document.querySelector('.email').value = '';
    document.querySelector('.phone').value = '';
    document.querySelector('.q1Grade').value = '';
    document.querySelector('.midtermGrade').value = '';
    document.querySelector('.q2Grade').value = '';
    document.querySelector('.projectGrade').value = '';
    document.querySelector('.finalGrade').value = '';
}

function remove_tr(This) {
    // Kullanıcıya emin olup olmadığına dair onay isteği göster
    const confirmation = confirm('Are you sure you want to delete this row?');

    // Eğer kullanıcı işlemi onaylarsa satırı sil
    if (confirmation) {
        This.closest('tr').remove();

        // Verileri localStorage'dan güncelle
        saveToLocalStorage();
    }

}

function edit_tr(This) {
    const tableRow = This.closest('tr');
    const cells = tableRow.querySelectorAll('td');

    // Satırın her hücresindeki verileri alarak inputlara doldur
    const nameSurname = cells[0].textContent;
    const email = cells[1].textContent;
    const phone = cells[2].textContent;
    const q1Grade = cells[3].textContent;
    const midtermGrade = cells[4].textContent;
    const q2Grade = cells[5].textContent;
    const projectGrade = cells[6].textContent;
    const finalGrade = cells[7].textContent;

    // Verileri inputlara yerleştir
    document.querySelector('.nameSurname').value = nameSurname;
    document.querySelector('.email').value = email;
    document.querySelector('.phone').value = phone;
    document.querySelector('.q1Grade').value = q1Grade;
    document.querySelector('.midtermGrade').value = midtermGrade;
    document.querySelector('.q2Grade').value = q2Grade;
    document.querySelector('.projectGrade').value = projectGrade;
    document.querySelector('.finalGrade').value = finalGrade;

    // Update butonunu Add butonuna dönüştür ve işlevselliği güncelle
    const addButton = document.querySelector('.addButton');
    if (addButton.getAttribute('onclick') === 'addDataToTable()') {
        addButton.innerHTML = '<i class="fa fa-refresh"></i> Update';
        addButton.setAttribute('onclick', 'updateDataToTable(this)');
    } else {
        addButton.innerHTML = 'Add Data';
        addButton.setAttribute('onclick', 'addDataToTable()');
    }

    // Seçilen satırı işaretle
    const selectedRow = document.querySelector('.selected-row');
    if (selectedRow) {
        selectedRow.classList.remove('selected-row');
    }
    tableRow.classList.add('selected-row');

    // Güncelleme işlemi sırasında mevcut satırdaki verileri değiştir
    tableRow.innerHTML = `
        <td>${nameSurname}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${q1Grade}</td>
        <td>${midtermGrade}</td>
        <td>${q2Grade}</td>
        <td>${projectGrade}</td>
        <td>${finalGrade}</td>
        <td>
            <button class="danger" onclick="remove_tr(this)">
                <i class="fa fa-close"></i>
            </button>
            <button class="edit" onclick="edit_tr(this)">
                <i class="fa fa-pencil"></i>
            </button>
        </td>
    `;
}

function updateDataToTable() {
    const selectedRow = document.querySelector('.selected-row');

    if (selectedRow) {
        const cells = selectedRow.querySelectorAll('td');

        // Inputlardaki değerleri al
        const nameSurname = document.querySelector('.nameSurname').value;
        const email = document.querySelector('.email').value;
        const phone = document.querySelector('.phone').value;
        const q1Grade = document.querySelector('.q1Grade').value;
        const midtermGrade = document.querySelector('.midtermGrade').value;
        const q2Grade = document.querySelector('.q2Grade').value;
        const projectGrade = document.querySelector('.projectGrade').value;
        const finalGrade = document.querySelector('.finalGrade').value;

        // Verileri güncelle
        cells[0].textContent = nameSurname;
        cells[1].textContent = email;
        cells[2].textContent = phone;
        cells[3].textContent = q1Grade;
        cells[4].textContent = midtermGrade;
        cells[5].textContent = q2Grade;
        cells[6].textContent = projectGrade;
        cells[7].textContent = finalGrade;

        // İsim ve soyisimde sayı olmadığını kontrol et
        if (/\d/.test(nameSurname)) {
            alert('Name or surname cannot contain numbers!');
            return;
        }

        // Emailin @stu.fsm içerip içermediğini kontrol et
        if (!email.endsWith('@stu.fsm')) {
            alert('Enter a valid @stu.fsm email address!');
            return;
        }

        // Telefon numarası kontrolü (+90 ile başlamalı)
        const phonePattern = /^\+90[0-9]{10}$/; // +90 ile başlayan 10 haneli telefon numarası kontrolü
        if (!phonePattern.test(phone)) {
            alert("Phone number must start with +90 and have 10 digits after that!");
            return; // Formun gönderilmesini engelle
        }

        // Tüm inputları kontrol et, herhangi biri boşsa ekleme yapma
        if (
            !nameSurname ||
            !email ||
            !phone ||
            !q1Grade ||
            !midtermGrade ||
            !q2Grade ||
            !projectGrade ||
            !finalGrade
        ) {
            alert('Tüm alanları doldurmalısınız!');
            return; // Eğer bir alan boşsa fonksiyonu burada sonlandır
        }

        // Seçilen satırın seçili sınıfını kaldır
        selectedRow.classList.remove('selected-row');

        // Verileri localStorage'a kaydet
        saveToLocalStorage();

        // Inputlardaki verileri temizle
        document.querySelector('.nameSurname').value = '';
        document.querySelector('.email').value = '';
        document.querySelector('.phone').value = '';
        document.querySelector('.q1Grade').value = '';
        document.querySelector('.midtermGrade').value = '';
        document.querySelector('.q2Grade').value = '';
        document.querySelector('.projectGrade').value = '';
        document.querySelector('.finalGrade').value = '';

        // Add butonunu Add Data işlevine bağla
        const addButton = document.querySelector('.addButton');
        addButton.innerHTML = 'Add Data';
        addButton.setAttribute('onclick', 'addDataToTable()');
    }
}


/*..........Grafik Oluşturma..........*/


// localStorage'dan verileri al
function placeOnChart() {

    const storedData = localStorage.getItem('tableData');

    if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Veri toplama için değişkenler
        let totalQ1 = 0;
        let totalMidterm = 0;
        let totalQ2 = 0;
        let totalProject = 0;
        let totalFinal = 0;

        // Verilerin toplamını hesapla
        parsedData.forEach(dataItem => {
            totalQ1 += parseFloat(dataItem.q1Grade);
            totalMidterm += parseFloat(dataItem.midtermGrade);
            totalQ2 += parseFloat(dataItem.q2Grade);
            totalProject += parseFloat(dataItem.projectGrade);
            totalFinal += parseFloat(dataItem.finalGrade);
        });

        // Ortalamaları hesapla
        const averageQ1 = totalQ1 / parsedData.length;
        const averageMidterm = totalMidterm / parsedData.length;
        const averageQ2 = totalQ2 / parsedData.length;
        const averageProject = totalProject / parsedData.length;
        const averageFinal = totalFinal / parsedData.length;


        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Midterm', 'Q2', 'Project', 'Final'],
                datasets: [{
                    label: 'Average Scores',
                    data: [averageQ1, averageMidterm, averageQ2, averageProject, averageFinal, 100],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var ctx_1 = document.getElementById('myChart_1').getContext('2d');
        var myChart_1 = new Chart(ctx_1, {
            type: 'pie',
            data: {
                labels: ['Q1', 'Midterm', 'Q2', 'Project', 'Final'],
                datasets: [{
                    label: 'avg scores',
                    data: [averageQ1, averageMidterm, averageQ2, averageProject, averageFinal],
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54,162,235,1)',
                        'rgba(255,206,86,1)',
                        'rgba(75,192,192,1)',
                        'rgba(153,102,255,1)',
                        'rgba(255,159,64,1)',
                    ], borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54,162,235,1)',
                        'rgba(255,206,86,1)',
                        'rgba(75,192,192,1)',
                        'rgba(153,102,255,1)',
                        'rgba(255,159,64,1)',
                    ],

                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false // Grafik boyutunun esnek olmasını sağlar
            }
        });
    }
}

function openEditForm() {
    // Kullanıcının mevcut bilgilerini localStorage'dan al
    const name = localStorage.getItem('name') || '';
    const occupation = localStorage.getItem('occupation') || '';
    const email = localStorage.getItem('email') || '';
    const phone = localStorage.getItem('phone') || '';

    // Form alanlarına mevcut bilgileri yerleştir
    document.getElementById('name').value = name;
    document.getElementById('occupation').value = occupation;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;

    // Düzenleme formunu göster
    document.querySelector('.edit-form-container').style.display = 'flex';
}


function closeEditForm() {
    // Düzenleme formunu gizle
    document.querySelector('.edit-form-container').style.display = 'none';
}

document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Formun varsayılan davranışını engelle

    // Formdaki verileri al
    const name = document.getElementById('name').value;
    const occupation = document.getElementById('occupation').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Email kontrolü
    const emailPattern = /@fsm\.com$/; // @fsm.com uzantısı kontrolü
    if (!emailPattern.test(email)) {
        alert("Enter a valid @fsm.com email address!");
        return; // Formun gönderilmesini engelle
    }

    // İsim ve soyisimde sayı olmadığını kontrol et
    if (/\d/.test(name)) {
        alert('Name or surname cannot contain numbers!');
        return;
    }

    // Telefon numarası kontrolü (+90 ile başlamalı)
    const phonePattern = /^\+90[0-9]{10}$/; // +90 ile başlayan 10 haneli telefon numarası kontrolü
    if (!phonePattern.test(phone)) {
        alert("Phone number must start with +90 and have 10 digits after that!");
        return; // Formun gönderilmesini engelle
    }

    // Formdaki verileri localStorage'a kaydet
    localStorage.setItem('name', name);
    localStorage.setItem('occupation', occupation);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);

    // Burada verileri güncelleme işlemini gerçekleştirebilirsiniz
    // Örnek olarak, formdaki verileri tekrar kişi kartına yerleştirme
    document.querySelector('.person-card h2').innerText = name;
    document.querySelectorAll('.person-card p')[0].innerText = `Occupation: ${occupation}`;
    document.querySelectorAll('.person-card p')[2].innerText = `Email: ${email}`;
    document.querySelectorAll('.person-card p')[3].innerText = `Phone: ${phone}`;

    // Düzenleme formunu gizle
    closeEditForm();
});

function loadProfileData() {
    const name = localStorage.getItem('name') || 'Kadir Aram';
    const occupation = localStorage.getItem('occupation') || 'Lecturer';
    const email = localStorage.getItem('email') || 'karam@fsm.com';
    const phone = localStorage.getItem('phone') || '+1234567890';

    document.getElementById('name').value = name;
    document.getElementById('occupation').value = occupation;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;

    // Kişi kartına verileri yerleştir
    document.querySelector('.person-card h2').innerText = name;
    document.querySelectorAll('.person-card p')[0].innerText = `Occupation: ${occupation}`;
    document.querySelectorAll('.person-card p')[2].innerText = `Email: ${email}`;
    document.querySelectorAll('.person-card p')[3].innerText = `Phone: ${phone}`;

}

document.addEventListener('DOMContentLoaded', loadProfileData);

function openMap() {
    // Kullanıcı konumunu al ve işaretçi olarak haritaya ekle
    navigator.geolocation.getCurrentPosition(function (position) {
        let userLat = position.coords.latitude.toFixed(4);
        let userLng = position.coords.longitude.toFixed(4);

        let userPosition = { lat: parseFloat(userLat), lng: parseFloat(userLng) };

        // Haritayı oluşturuyoruz ve konuma zoom yapıyoruz
        let MAP = L.map('map').setView(userPosition, 10);

        let u = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let attribution = '&copy; OpenStreetMap contributors';
        L.tileLayer(u, { attribution }).addTo(MAP); // Haritaya tileLayer ekledik

        // Kullanıcı konumuna işaretçi (marker) ekle
        let userMarker = L.marker(userPosition).addTo(MAP);
        userMarker.bindPopup("<b>Buradasınız!</b><br>Konumunuz."); // İşaretçiye bir açıklama ekleme

        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userLat}&lon=${userLng}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                //const province = data.address.province;
                console.log(data);
                //const province = data.address.province;
                const suburb = data.address.suburb;
                const town = data.address.town;
                const province = data.address.province;
                //console.log(`address ${display_name}`);
                document.querySelectorAll('.person-card p')[1].innerText = `Address: ${suburb} ${town} ${province}`;
            })
            .catch(error => console.log(error));
    });

}



