
let students = [];

let kontrolLocal = localStorage.getItem("students")

if (kontrolLocal) {
    students = JSON.parse(localStorage.getItem("students"));
} else {
    students = [];
}

const studentForm = document.querySelector("#student-form")

const studentList = document.querySelector("#student-list")

const addButton = document.querySelector(".ekle")

gorStudent()

studentForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const isim = document.querySelector("#isim").value;
    const soyad = document.querySelector("#soyad").value;
    const number = document.querySelector("#number").value;
    const proje = document.querySelector("#proje").value;
    const final = document.querySelector("#final").value;
    const egitici = document.querySelector("#egitici").value;

    const newStudent = {
        isim: isim.toUpperCase(),
        soyad: soyad.toUpperCase(),
        number: number,
        proje: Number(proje),
        final: Number(final),
        egitici: Number(egitici),
    };

    students.push(newStudent);
    studentForm.reset();
    saveToLocalStorage();
    gorStudent();

});

function gorStudent() {
    const deleteDiv = document.querySelector(".empty")

    if (students.length) {
        if (deleteDiv) {
            deleteDiv.style.display = "none";
        }
        studentList.innerHTML = "";


        students.forEach((girilenOgrenci, index) => {
            const ogrenciCard = `
            <div class="student-item-info">
                <div class="title">
                    <h3>${girilenOgrenci.isim} ${girilenOgrenci.soyad}</h3>
                    <p>Kayıt No: ${girilenOgrenci.number}</p>
                </div>
                <div class="title-middle">
                    <div class="title-middle-start">
                        <span>Etkinlikler : ${girilenOgrenci.proje} </span>
                        <span>Final Projesi : ${girilenOgrenci.final} </span>
                        <span>Eğitimci Notu :  ${girilenOgrenci.egitici}</span>
                    </div>
                    <div class="title-middle-end">
                        <img src="images/diploma.svg" alt="">
                        <p class="ortalama">Ortalama </p>
                        <div class="puan-title">
                            <hr>
                            <p class="puan">${(((girilenOgrenci.proje * 0.4 + girilenOgrenci.final * 0.6) + girilenOgrenci.egitici) / 2)}</p>
                        </div>
                   </div>
                    <div class="student-item-process">
                        <i class="fa-regular fa-pen-to-square edit" onclick='editOgrenci(${index})'></i>
                        <i class="fa-regular fa-trash-can delete"  onclick='deleteOgrenci(${index})'></i>
                    </div>
                </div>    
            </div>
            `;

            const ogrenciItem = document.createElement("div");
            ogrenciItem.classList.add("student-item");
            ogrenciItem.innerHTML = ogrenciCard;


            const ortalama = (((girilenOgrenci.proje * 0.4 + girilenOgrenci.final * 0.6) + girilenOgrenci.egitici) / 2);


            if (ortalama >= 90) {
                ogrenciItem.style.background = "#2bff00";

                const noteA = document.createElement("p");
                noteA.classList.add("note");
                noteA.textContent = "AA";
                console.log(noteA)
                ogrenciItem.querySelector(".puan-title").prepend(noteA);

            } else if (ortalama > 75) {
                ogrenciItem.style.background = "#035bff";

                let noteA = ogrenciItem.querySelector(".note");
                if (noteA) {
                    noteA.remove();
                }

                const noteB = document.createElement("p");
                noteB.classList.add("note");
                noteB.textContent = "BB";
                console.log(noteB)
                ogrenciItem.querySelector(".puan-title").prepend(noteB);


            } else if (ortalama > 60) {
                ogrenciItem.style.background = "#b508c8";

                let noteA = ogrenciItem.querySelector(".note");
                if (noteA) {
                    noteA.remove();
                }

                const noteC = document.createElement("p");
                noteC.classList.add("note");
                noteC.textContent = "CC";
                console.log(noteC)
                ogrenciItem.querySelector(".puan-title").prepend(noteC);

                console.log(ortalama)
            } else if (ortalama > 45) {
                ogrenciItem.style.background = "#86803d";

                let noteA = ogrenciItem.querySelector(".note");
                if (noteA) {
                  noteA.remove();
                }

                const noteD = document.createElement("p");
                noteD.classList.add("note");
                noteD.textContent = "DD";
                console.log(noteD)
                ogrenciItem.querySelector(".puan-title").prepend(noteD);

                console.log(ortalama)
            } else {
                ogrenciItem.style.background = "#ff0000";

                console.log(ortalama)

                const diplomaImg = ogrenciItem.querySelector("img");
                if (diplomaImg) {
                    diplomaImg.parentNode.removeChild(diplomaImg);
                };

                let noteA = ogrenciItem.querySelector(".note");
                if (noteA) {
                  noteA.remove();
                }

                const noteF = document.createElement("p");
                noteF.classList.add("note");
                noteF.textContent = "FF";
                console.log(noteF)
                ogrenciItem.querySelector(".puan-title").prepend(noteF);

                const kaldiParagraf = document.createElement("p");
                kaldiParagraf.classList.add("kaldi");
                kaldiParagraf.textContent = "KALDI";
                ogrenciItem.querySelector(".title-middle-end").prepend(kaldiParagraf);
            }

            studentList.appendChild(ogrenciItem);

        });
    } else {
        const forEmpty = `
        <p class="empty">Listeye ekleme yapılmadı.</p>
        `
        studentList.innerHTML = forEmpty;
    }
}

function deleteOgrenci(gelenIndex) {
    console.log('gelenIndex', gelenIndex);

    const sonuc = students.filter((gelenDeger, index) => {

        if (index === gelenIndex) {
            Toastify({
                text: `${gelenDeger.isim} ${gelenDeger.soyad} adındaki öğrenci listesinden silindi.`,
                duration: 2000
            }).showToast();
        }
        return index !== gelenIndex;
    });

    students = sonuc;

    saveToLocalStorage()

    gorStudent();
}

function editOgrenci(gelenIndex) {

    const editOgrenci = students[gelenIndex];

    console.log("editStudent", editOgrenci);

    document.querySelector("#isim").value = editOgrenci.isim;
    document.querySelector("#soyad").value = editOgrenci.soyad;
    document.querySelector("#number").value = editOgrenci.number;
    document.querySelector("#proje").value = editOgrenci.proje;
    document.querySelector("#final").value = editOgrenci.final;
    document.querySelector("#egitici").value = editOgrenci.egitici;

    Toastify({
        text: `${editOgrenci.isim} ${editOgrenci.soyad} adındaki öğrenci değişiklik yapılacaktır. Önceki kayıt silindi.`,
        duration: 2000
    }).showToast();


    function deleteOgrenci(gelenIndex) {
        console.log('gelenIndex', gelenIndex);

        const sonuc = students.filter((gelenDeger, index) => {
            return index !== gelenIndex;
        });

        students = sonuc;

        gorStudent();
    };

    deleteOgrenci(gelenIndex)

    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}


