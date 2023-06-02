"use strict";

$(document).ready(function () {
  const arrLowongan = [
    "System Administrator",
    "Database Developer",
    "Web Developer",
  ];
  const arrPosisi = ["Bandung", "Jakarta"];

  $.each(arrLowongan, function (value) {
    $("#lowongan").append(
      '<option value="' + value + '">' + value + "</option>"
    );
  });

  $.each(arrPosisi, function (value) {
    $("#posisi").append('<option value="' + value + '">' + value + "</option>");
  });

  $("#form-rekruitasi").submit(function (event) {
    event.preventDefault();

    $("#formulir").hide();
    $("#result").show();

    let fullname = $("#fullname").val();
    let email = $("#email").val();
    let noTelp = $("#no-telp").val();
    let lowongan = $("#lowongan").val();
    let posisi = $("#posisi").val();

    $("#resultFullname").text("Fullname: " + fullname);
    $("#resultEmail").text("Email: " + email);
    $("#resultPhone").text("Phone number: " + noTelp);
    $("#resultVacancy").text("Vacancy: " + lowongan);
    $("#resultPosition").text("Position: " + posisi);
  });
});
