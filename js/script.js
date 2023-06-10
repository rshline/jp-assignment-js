"use strict";

$(document).ready(function () {
  const arrLowongan = {
    "System Administrator": 1,
    "Database Developer": 2,
    "Web Developer": 3,
  };
  const arrPosisi = ["Bandung", "Jakarta"];

  const inputs = [];

  $.each(arrLowongan, function (key) {
    $("#lowongan").append('<option value="' + key + '">' + key + "</option>");
  });

  $.each(arrPosisi, function (i, value) {
    $("#posisi").append('<option value="' + value + '">' + value + "</option>");
  });

  $("#lowongan").on("change", function () {
    let selectedOption = $(this).val();
    let numApplied = countApplied(inputs, selectedOption);
    let kuota = arrLowongan[selectedOption];

    if (numApplied >= kuota) {
      disableOption(selectedOption);
      updateOptionMessage(
        "danger-info",
        `Mohon maaf, rekrutasi untuk ${selectedOption} sudah penuh dan tidak dapat dipilih.`
      );
    } else if (numApplied <= 2) {
      updateOptionMessage(
        "success-info",
        `Kuota tersisa untuk ${selectedOption} hanya ${kuota - numApplied} pendaftar.`
      );
    } else {
      updateOptionMessage(
        "success-info",
        `Anda dapat memilih lowongan ${selectedOption}.`
      );
    }
  });

  $("#form-rekruitasi").submit(function (event) {
    event.preventDefault();

    let fullname = $("#fullname").val();
    let email = $("#email").val();
    let noTelp = $("#no-telp").val();
    let lowongan = $("#lowongan").val();
    let posisi = $("#posisi").val();

    // Validasi
    if (fullname === "") {
      showError("Fullname tidak boleh kosong!");
      return;
    } else if (email === "") {
      showError("Email tidak boleh kosong!");
      return;
    } else if (noTelp === "") {
      showError("No Telp tidak boleh kosong!");
      return;
    } else if (lowongan === "" || lowongan === null) {
      showError("Pilih lowongan!");
      return;
    } else if (posisi === "") {
      showError("Pilih posisi!");
      return;
    }

    let isEmailValid = inputs.every(function (input) {
      return email !== input.email;
    });

    if (!isEmailValid) {
      showError("Email sudah digunakan!");
      return;
    }

    inputs.push({
      fullname: fullname,
      email: email,
      noTelp: noTelp,
      lowongan: lowongan,
      posisi: posisi,
    });

    let total = inputs.length;

    $("#formulir").hide();
    $("#result").show();

    $("#submitSuccess").text(
      `Terima kasih telah melakukan pengisian. Anda adalah pendaftar ke-${total}. Permintaan anda akan segera kami proses.`
    );
    $("#resultFullname").text("Fullname: " + fullname);
    $("#resultEmail").text("Email: " + email);
    $("#resultPhone").text("Phone number: " + noTelp);
    $("#resultVacancy").text("Vacancy: " + lowongan);
    $("#resultPosition").text("Position: " + posisi);
  });

  $("#backToForm").click(function () {
    $("#fullname").val("");
    $("#email").val("");
    $("#no-telp").val("");
    $("#lowongan").val("");
    $("#posisi").val("");
    $("#optionMsg").text("");
    $("#errorMsg").text("");

    $("#formulir").show();
    $("#result").hide();
  });

  function countApplied(inputs, selectedOption) {
    return inputs.reduce(function (count, input) {
      return count + (input.lowongan === selectedOption ? 1 : 0);
    }, 0);
  }

  function disableOption(optionValue) {
    $("#lowongan option[value='" + optionValue + "']").prop("disabled", true);
  }

  function updateOptionMessage(className, message) {
    $("#optionMsg").removeClass().addClass(className).text(message);
  }

  function showError(errorMessage) {
    $("#errorMsg").text(errorMessage);
  }
});