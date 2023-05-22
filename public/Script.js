$(document).ready(function () {
  let formSubmitted = false;
  let summaryForm = document.getElementById("summary-form");
  let salesFormMessage = document.getElementById("sales-form-message");
  $(".calculator-tab-content #filter-tab").hide();
  $(".calculator-tab-content #filter-tab:first").show();
  $(".calculator-filter li").on("click", eventTrigger);
  function eventTrigger() {
    var getFilterName = $(this).attr("class");
    var isClassAll = $(this).hasClass("all");
    $(this).addClass("tab-active").siblings().removeClass("tab-active");
    if (isClassAll != true) {
      if ($(this).hasClass("tab5") && formSubmitted == false ) {
        summaryForm.classList.add("active");
        document.querySelector('.tab4').classList.add('tab-active');
        document.querySelector('.tab5').classList.remove('tab-active');
      } else { 
      $(".calculator-tab-content  #filter-tab[class='" + getFilterName + "']")
        .show()
        .siblings()
        .hide();
      }
    } else {
      $(this).find(".calculator-tab-content #filter-tab").show();
    }
  }
  let summaryButton = document.getElementById('detailed-summmary');
  summaryButton.addEventListener('click', function() {
    summaryForm.classList.add("active");
  });
  let closeButtons = document.getElementsByClassName("close-popup");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function (e) {
      e.target.closest(".popup").classList.remove("active");
    });
  }
  let popups = document.getElementsByClassName('popup');
  for (let i=0; i<popups.length;i++) {
    popups[i].addEventListener('click', function(e){
      if (!e.target.closest('.wrapper')) {
        e.target.closest('.popup').classList.remove('active');
      }
    })
  }
  
  $(".st-filter-two-truck-setup-extension").css(
    "min-height",
    $(".st-filter-two-inputs").height() + "px"
  );
  // / NEXT PREVIOUS TRAIL STARTS------------------------------>
  $(".tab-next").click(function () {
    if (formSubmitted == false && $(this).closest("#filter-tab").hasClass("tab4")) {
      summaryForm.classList.add("active");
      } else {      
        $(".tab-next").removeClass("active");
        $(this).addClass("active");
        $("#filter-tab").hide();
        isnexttab = $(this)
          .closest("#filter-tab")
          .hide()
          .next()
          .show()
          .attr("class");
        $(".calculator-filter li[class='" + isnexttab + "']")
          .addClass("tab-active")
          .siblings()
          .removeClass("tab-active");
      }
  });
  $(".tab-previous").click(function () {
    $(".tab-previous").removeClass("active");
    $(this).addClass("active");
    $("#filter-tab").hide();
    isprevtab = $(this)
      .closest("#filter-tab")
      .hide()
      .prev()
      .show()
      .attr("class");
    $(".calculator-filter li[class='" + isprevtab + "']")
      .addClass("tab-active")
      .siblings()
      .removeClass("tab-active");
  });
  $(".get-started").click(function () {
    $(".get-started").removeClass("active");
    $(this).addClass("active");
    $("#filter-tab").hide();
    isnexttab = $(this)
      .closest("#filter-tab")
      .hide()
      .next()
      .show()
      .attr("class");
    $(".calculator-filter li[class='" + isnexttab + "']")
      .addClass("tab-active")
      .siblings()
      .removeClass("tab-active");
  });
  // close button trail
  $(".close").click(function () {
    $(".close").removeClass("active");
    $(this).addClass("active");
    $("#filter-tab").hide();
    firsttab = $(this)
      .closest("#filter-tab")
      .hide()
      .siblings()
      .first()
      .attr("class");
    isfirsttab = $(this)
      .closest("#filter-tab")
      .hide()
      .siblings()
      .first()
      .show();
    $(".calculator-filter li[class='" + firsttab + "']")
      .addClass("tab-active")
      .siblings()
      .removeClass("tab-active");
    location.reload();
  });
  // close button ends
  // decimal 00----->
  jQuery(document).on("change", "#filter-1-price", function () {
    var this_val = jQuery(this).val();
    jQuery("#filter-1-price").val(parseFloat(this_val).toFixed(2));
  });

  const detailForm = document.getElementById('detail-form');
  detailForm.addEventListener('submit', firstSubmit);

  function firstSubmit(e) {
    e.preventDefault();
    submitForm(detailForm);
    formSubmitted = true;
    e.target.closest(".popup").classList.remove("active");
    $(".calculator-tab-content  #filter-tab[class='tab5']")
      .show()
      .siblings()
      .hide();
    document.querySelector('.tab4').classList.remove('tab-active');
    document.querySelector('.tab5').classList.add('tab-active');
    return true;
  }

});
// NEXT PREVIOUS TRAIL ENDS-----------------------------------------------?

function fetch_cost() {
  // trail operation fuel comma-------->
  let op_purchase_fuel_enpack = document.getElementById(
    "filter-2-purchase-price-ts"
  ).value;
  document.getElementById("filter-2-purchase-price-ts").value = toStrg(
    op_purchase_fuel_enpack
  );
  // convention truck---->
  let op_purchase_fuel_conven = document.getElementById("filter-2-purchase-price-te").value;
  document.getElementById("filter-2-purchase-price-te").value = toStrg(op_purchase_fuel_conven);
  // end of life enpack---->
  let op_enpack_end_life = document.getElementById("filter-2-end-of-life-te").value;
  document.getElementById("filter-2-end-of-life-te").value =
    toStrg(op_enpack_end_life);
  let op_conven_end_life = document.getElementById(
    "filter-2-end-of-life-ts"
  ).value;
  document.getElementById("filter-2-end-of-life-ts").value =
    toStrg(op_conven_end_life);
  // trail operation fuel comma ends-------->
  let fuel_cost = parseFloat(document.getElementById("filter-1-price").value);
  let operating_days = parseFloat(
    document.getElementById("filter-1-days").value
  );
  let fleet_size = parseFloat(
    document.getElementById("filter-1-fleet-size").value
  );
  document.getElementById("filter-1-price-two").value = fuel_cost.toFixed(2);
  document.getElementById("filter-1-days-two").value = operating_days.toFixed(0);
  document.getElementById("filter-1-fleet-size-two").value = fleet_size.toFixed(0);
  let fuel_cosumption = parseFloat(document.getElementById("truck-rate").value);
  let duration = parseFloat(document.getElementById("truck-duration").value);
  let fuel_cons_duration = duration * fuel_cosumption * fuel_cost * operating_days;
  let fuel_consumption_two = parseFloat(document.getElementById("value1").innerText);
  let duration_two = parseFloat(document.getElementById("enpak-duration").value);
  let fuel_cons_duration_two = (duration_two * operating_days) * (fuel_consumption_two * fuel_cost);
  let enpak_truck_savings = Math.round(fuel_cons_duration - fuel_cons_duration_two);
  // int_enpak_truck_savings

  let int_enpak_truck_savings = Math.round(fuel_cons_duration - fuel_cons_duration_two);
  if (!isNaN(int_enpak_truck_savings)) {
    if (!isFinite(int_enpak_truck_savings)) {
      int_enpak_truck_savings = 0;
    }
    parseInt((document.getElementById("enpak-savings").innerText = int_enpak_truck_savings));
  }
  if (!isNaN(int_enpak_truck_savings)) {
    if (!isFinite(int_enpak_truck_savings)) {
      int_enpak_truck_savings = 0;
    }
    parseInt((document.getElementById("annual_savings").innerText = int_enpak_truck_savings));
  }
  // int ends
  if (!isNaN(enpak_truck_savings)) {
    if (!isFinite(enpak_truck_savings)) {
      enpak_truck_savings = 0;
    }
    document.getElementById("enpak-savings").innerText = enpak_truck_savings;
  }
  if (!isNaN(enpak_truck_savings)) {
    if (!isFinite(enpak_truck_savings)) {
      enpak_truck_savings = 0;
    }
    document.getElementById("annual_savings").innerText = enpak_truck_savings.toLocaleString();
  }
  // int_annual_fleet_savings
  let int_annual_fleet_savings = int_enpak_truck_savings * fleet_size;
  console.log({int_annual_fleet_savings});
  if (!isNaN(int_annual_fleet_savings)) {
    document.getElementById("annual_fleet_savings").innerText = int_annual_fleet_savings;
  }
  // int_annual_fleet_savings ends
  let annual_fleet_savings = enpak_truck_savings * fleet_size;
  if (!isNaN(annual_fleet_savings)) {
    document.getElementById("annual_fleet_savings").innerText = annual_fleet_savings.toLocaleString();
  }
  let cts_value = document.getElementById("filter-2-life-cycle-ts").value;
  let life_cycle_fleet_savings = annual_fleet_savings * cts_value;
  if (!isNaN(life_cycle_fleet_savings)) {
    if (!isFinite(life_cycle_fleet_savings)) {
      life_cycle_fleet_savings = 0;
    }
    document.getElementById("life_cycle_fleet_savings").innerText = life_cycle_fleet_savings;
  }
  document.getElementById("filter-1-price-three").value = operating_days;
  document.getElementById("filter-1-fleet-size-three").value = fleet_size;
}
function fetch_cost_new() {
  let fuel_cost_new = parseFloat(document.getElementById("filter-1-price-two").value);
  let operating_days_new = parseFloat(document.getElementById("filter-1-days-two").value);
  let fleet_size_new = parseFloat(document.getElementById("filter-1-fleet-size-two").value);
  let fuel_consumption_new = parseFloat(document.getElementById("truck-rate").value);
  let duration_new = parseFloat(document.getElementById("truck-duration").value);
  let fuel_cons_duration_new = duration_new * fuel_consumption_new * fuel_cost_new * operating_days_new;
  let fuel_consumption_two_new = document.getElementById("value1").innerText;
  let duration_two_new = parseFloat(document.getElementById("enpak-duration").value);
  let fuel_cons_duration_two_new = duration_two_new * fuel_consumption_two_new * fuel_cost_new * operating_days_new;
  let enpak_truck_savings_new = Math.round(fuel_cons_duration_new - fuel_cons_duration_two_new);

  if (!isNaN(enpak_truck_savings_new)) {
    if (!isFinite(enpak_truck_savings_new)) {
      enpak_truck_savings_new = 0;
    }
    document.getElementById("enpak-savings").innerText = enpak_truck_savings_new.toLocaleString();
    document.getElementById("annual_savings").innerText = enpak_truck_savings_new.toLocaleString();
  }
  let annual_fleet_savings_new = enpak_truck_savings_new * fleet_size_new;    
  console.log({annual_fleet_savings_new});
  if (!isNaN(annual_fleet_savings_new)) {
    document.getElementById("annual_fleet_savings").innerText = annual_fleet_savings_new.toLocaleString();
  }
  let cts_value_new = document.getElementById("filter-2-life-cycle-ts").value;
  let life_cycle_fleet_savings_new = annual_fleet_savings_new * cts_value_new;
  if (!isNaN(life_cycle_fleet_savings_new)) {
    if (!isFinite(life_cycle_fleet_savings_new)) {
      life_cycle_fleet_savings_new = 0;
    }
    document.getElementById("life_cycle_fleet_savings").innerText = life_cycle_fleet_savings_new.toLocaleString();
  }
  document.getElementById("filter-1-price-three").value = operating_days_new.toLocaleString();
  document.getElementById("filter-1-fleet-size-three").value = fleet_size_new.toLocaleString();
  //new
  let enpak_purchase = toNumber(document.getElementById("filter-2-purchase-price-te").value);
  let conventional_purchase = toNumber(document.getElementById("filter-2-purchase-price-ts").value);
  let paybackFuelSavings = (enpak_purchase - conventional_purchase) / enpak_truck_savings_new;

  if (!isNaN(paybackFuelSavings)) {
    if (!isFinite(paybackFuelSavings)) {
      paybackFuelSavings = 0;
    }
    document.getElementById("pay-year").innerText = paybackFuelSavings.toFixed(1);
  }
  // detail summary
  // converting to int
  let int_fuel_annual_save = document.getElementById("annual_savings").innerText;
  document.getElementById("de_fuel_annual_save").innerText = toNumber(int_fuel_annual_save);
  // converting to int ends
  let detail_annual_savings = document.getElementById("annual_savings").innerText;
  document.getElementById("de_fuel_annual_save").innerText = detail_annual_savings.toLocaleString();

  let fuelSavingsAnnualPerTruck = document.getElementsByName('fuel-savings__annual-fleet');
  fuelSavingsAnnualPerTruck.forEach((value) => {
    value.value = detail_annual_savings.toLocaleString();
  })

  let int_fuel_annual_fleet_save = document.getElementById("annual_fleet_savings").innerText;
  document.getElementById("de_fuel_annual_fleet_save").innerText =int_fuel_annual_fleet_save;
  let detail_fleet_annual_savigs = document.getElementById("annual_fleet_savings").innerText;
  document.getElementById("de_fuel_annual_fleet_save").innerText = detail_fleet_annual_savigs.toLocaleString();

  let fuelSavingsAnnualFleet = document.getElementsByName('fuel-savings__annual-fleet');
  fuelSavingsAnnualFleet.forEach((value) => {
    value.value = detail_fleet_annual_savigs.toLocaleString();
  })

  let detail_life_savings = document.getElementById("life_cycle_fleet_savings").innerText;
  document.getElementById("de_fuel_ife-save").innerText = detail_life_savings.toLocaleString();
  let fuelSavingsLifeCycle = document.getElementsByName('fuel-savings__life-cycle');
  fuelSavingsLifeCycle.forEach((value) => {
    value.value = detail_life_savings.toLocaleString();
  })

  let detail_life_year = Number(document.getElementById("pay-year").innerText);
  let detail_life_year_formatted = new Intl.NumberFormat({  maximumFractionDigits: 0, roundingIncrement: 1 } ).format(detail_life_year);
  document.getElementById("de_fuel_payback").innerText = detail_life_year_formatted;
  let fuelSavingsPayback = document.getElementsByName('fuel-savings__payback');
  fuelSavingsPayback.forEach((value) => {
    value.value = detail_life_year_formatted;
  })
}

// string to number and sepearating commas treating as number
function toNumber(num) {
  let val1 = num.split(",");
  let val2 = val1.join("");
  return parseInt(val2);
}

function toFloat(num) {
  let val1 = num.split(",");
  let val2 = val1.join("");
  return parseFloat(val2);
}
// maintance calcuctions
function change_first_screen() {
  let cof = parseFloat(document.getElementById("filter-1-price-two").value);
  let od = parseFloat(document.getElementById("filter-1-days-two").value);
  let fs = parseFloat(document.getElementById("filter-1-fleet-size-two").value);
  let fas = parseInt(document.getElementById("annual_savings").value);
  document.getElementById("filter-1-price").value = cof.toFixed(2);
  document.getElementById("filter-1-days").value = od.toLocaleString(0);
  document.getElementById("filter-1-fleet-size").value = fs.toLocaleString(0);
  let ep = parseInt(
    document.getElementById("filter-2-purchase-price-te").value
  );
  let cp = parseInt(
    document.getElementById("filter-2-purchase-price-ts").value
  );
  document.getElementById("annual_savings").value = fas;
  let pfs = (ep - cp) / fas;
}
function change_thrid_screen() {
  let cof_three = parseFloat(
    document.getElementById("filter-1-price-three").value
  );
  let fs_three = parseFloat(
    document.getElementById("filter-1-fleet-size-three").value
  );
  document.getElementById("filter-1-days").value = cof_three;
  document.getElementById("filter-1-fleet-size").value = fs_three;
  document.getElementById("filter-1-days-two").value = cof_three;
  document.getElementById("filter-1-fleet-size-two").value = fs_three;
}
function printFunction() {
  window.print();
}
// MAINTENANCE SAVINGS
function maintenanceSavings() {
  let tot_annual_save,
    detail_tot_annual_save,
    int_detail_tot_annual_save,
    int_tot_annual_save;
  // re-calcultions of life cycle fleet-------->
  let re_fleet_size = document.getElementById(
    "filter-1-fleet-size-three"
  ).value;
  let re_convo_life_year = document.getElementById(
    "filter-2-life-cycle-ts"
  ).value;
  // re-calcutions of life cycle fleet ends----------------->

  // new formula interval hours starts------------------------------------------------------------------------------------->
  // conventional interval------>
  let con_pre_interval_hours = toNumber(document.getElementById("conventional_preventive_maintenance").value);
  let con_emission_interval_hours = toNumber(document.getElementById("conventional_emmission_interval").value);

  // Truck with PTO Maintence cost values---->
  let duration = document.getElementById("truck-duration").value;
  let operating_days = document.getElementById("filter-1-price-three").value;
  let con_pre_cost = toNumber(document.getElementById("preventive_main_cost").value);
  let con_emission_cost = toNumber(document.getElementById("emissions_equipment").value);

  let con_total_main_cost_idle = (( duration * operating_days) / con_pre_interval_hours) * con_pre_cost + (( duration * operating_days )/  con_emission_interval_hours) * con_emission_cost ;
  
  console.log('(Duration:' + duration + '* Operating Days:' + operating_days + ')/(Preventive Interval:' + con_pre_interval_hours + ') * Preventive Cost:' + con_pre_cost + ' + (Duration:' + duration + ' * Operating Days:' + operating_days + ')/(Emission Interval:' + con_emission_interval_hours + ') * Emission Cost:' + con_emission_cost + ' = ' + con_total_main_cost_idle);

  if (!isNaN(con_total_main_cost_idle)) {
    if (!isFinite(con_total_main_cost_idle)) {
      con_total_main_cost_idle = 0;
    }
    document.getElementById("cost-idle_truck").innerHTML = con_total_main_cost_idle.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
  }

  // Enpack Maintence cost values---->
  let enpack_pre_interval_hour = toNumber(document.getElementById("enpack_preventive_main_interval").value);
  let enpack_emission_interval_hour = toNumber(document.getElementById("enpack_emi_interval_hour").value);
  let enpack_pre_cost = toNumber(document.getElementById("enpack_main_cost").value);
  let enpack_emi_cost = toNumber(document.getElementById("enpack_emission_cost").value);
  let enpak_duration = toNumber(document.getElementById("enpak-duration").value);

  let enpack_total_cost_idle = (( enpak_duration * operating_days) / enpack_pre_interval_hour) * enpack_pre_cost;

  if (!isNaN(enpack_total_cost_idle)) {
    if (!isFinite(enpack_total_cost_idle)) {
      enpack_total_cost_idle = 0;
    }
    document.getElementById("enpack-idle").innerHTML = enpack_total_cost_idle.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
  }

  // let int_enpack_total_cost_idle = enpack_sum_interval_divide * enpack_sum_of_costs;

  // annual savings calculations--------------------->
  let new_main_annual_savings = con_total_main_cost_idle - enpack_total_cost_idle;
  if (!isNaN(new_main_annual_savings)) {
    if (!isFinite(new_main_annual_savings)) {
      new_main_annual_savings = 0;
    }
    document.getElementById("main_annual_savings").innerHTML = new_main_annual_savings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
  }
  // number conversion-------->
  let int_new_main_annual_savings = con_total_main_cost_idle - enpack_total_cost_idle;
  console.log(
    typeof int_new_main_annual_savings,
    "int_new_main_annual_savings"
  );
  // number conversion------>
  // annual savings calculations ends----------------------->

  // annual fleet savings starts------------------------->
  let new_main_fleet_size = document.getElementById("filter-1-fleet-size-three").value;
  let new_annual_fleet_savings = new_main_annual_savings * new_main_fleet_size;
  if (!isNaN(new_annual_fleet_savings)) {
    document.getElementById("main_annual_fleet_savings").innerHTML = new_annual_fleet_savings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
  }
  // number conversion---->
  let int_new_annual_fleet_savings = int_new_main_annual_savings * new_main_fleet_size;
  console.log(
    typeof int_new_annual_fleet_savings,
    "int_new_annual_fleet_savings"
  );
  // number conversion------->
  // annual fleet savings ends------------------------>

  // life cycle fleet savings starts------------------>
  let new_op_con_life_years = document.getElementById(
    "filter-2-life-cycle-ts"
  ).value;
  console.log(new_op_con_life_years);
  let new_life_cycle_fleet_savings = new_annual_fleet_savings * new_op_con_life_years;
  console.log(new_life_cycle_fleet_savings);
  if (!isNaN(new_life_cycle_fleet_savings)) {
    document.getElementById("main_life_cycle_fleet_savings").innerHTML = new_life_cycle_fleet_savings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
  }
  // number conversion----------------->
  let int_new_life_cycle_fleet_savings = int_new_annual_fleet_savings * new_op_con_life_years;
  // number conversion------------>
  // life cycle fleet saving ends------------------->

  // payback maintenance starts--------------------->
  let new_enpack_purchase = toNumber(document.getElementById("filter-2-purchase-price-te").value);
  let new_con_purchase = toNumber(document.getElementById("filter-2-purchase-price-ts").value);
  let new_payback_maintenance = (new_enpack_purchase - new_con_purchase) / new_main_annual_savings;
  if (!isNaN(new_payback_maintenance)) {
    document.getElementById("pay-fuel").innerHTML = new_payback_maintenance.toFixed(1);
  }
  // payback maintenance ends----------------->
  // new formula interval hours starts------------------------------------------------------------------------------------->

  // -------------------------------------------------detail maintenace--------------------------------------------------------->
  // int_detail_main_annual_save starts
  let int_detail_main_annual_save = document.getElementById( "main_annual_savings").innerText;
  document.getElementById("de_main_annual_save").innerText = int_detail_main_annual_save;

  // int_detail_main_annual_save ends
  let detail_main_annual_save = document.getElementById( "main_annual_savings" ).innerText;
  document.getElementById("de_main_annual_save").innerText = detail_main_annual_save.toLocaleString();
  document.getElementsByName('maintenance-savings__annual-per-truck').forEach((value) => value.value = detail_main_annual_save.toLocaleString());

  // int_detail_main_fleet_annual_savigs  starts
  let int_detail_main_fleet_annual_savigs = document.getElementById("main_annual_fleet_savings").innerText;
  document.getElementById("de_main_fleet_annual_save").innerText = int_detail_main_fleet_annual_savigs;

  // int_detail_main_fleet_annual_savigs ends
  let detail_main_fleet_annual_savigs = document.getElementById("main_annual_fleet_savings").innerText;
  document.getElementById("de_main_fleet_annual_save").innerText = detail_main_fleet_annual_savigs.toLocaleString();
  document.getElementsByName('maintenance-savings__annual-fleet').forEach((value) => value.value = detail_main_fleet_annual_savigs.toLocaleString());

  let detail_main_life_savings = document.getElementById("main_life_cycle_fleet_savings").innerText;
  document.getElementById("de_main_life-save").innerText = detail_main_life_savings.toLocaleString();
  document.getElementsByName('maintenance-savings__life-cycle').forEach((value) => value.value = detail_main_life_savings.toLocaleString());

  let detail_main_life_year = document.getElementById("pay-fuel").innerText;
  document.getElementById("de_main_payback").innerHTML = detail_main_life_year;
  document.getElementsByName('maintenance-savings__payback').forEach((value) => value.value = detail_main_life_year);


  // -----------------------------------detail maintenance savings--------------------------------------------------------------------->


  // ---------------------4 edits adding 1st and 2nd ---------------------------->
  // detail annual savings starts----------------->
  let add_tot_f_annual_save = document.querySelector("#de_fuel_annual_save").innerText;
  let add_tot_main_annual_save = document.querySelector("#de_main_annual_save").innerText;
  let new_tot_of_annual_save = toNumber(add_tot_f_annual_save) + toFloat(add_tot_main_annual_save);
  document.querySelector("#total_annual_savings").innerText = new_tot_of_annual_save.toLocaleString();
  document.getElementsByName('operational-savings__annual-per-truck').forEach((value) => value.value = new_tot_of_annual_save.toLocaleString());

  // dewtail annual savings ends--------------->

  // detail annual fleet savingd starts----------->
  let add_tot_f_annual_fleet = document.querySelector("#de_fuel_annual_fleet_save").innerText;
  let add_tot_main_annual_fleet = document.querySelector("#de_main_fleet_annual_save").innerText;
  let new_tot_of_fleet_save =toNumber(add_tot_f_annual_fleet) + toNumber(add_tot_main_annual_fleet);
  document.querySelector("#total-fleet_savings").innerText = new_tot_of_fleet_save.toLocaleString();
  document.getElementsByName('operational-savings__annual-fleet').forEach((value) => value.value = new_tot_of_fleet_save.toLocaleString());
  // detail annual fleet savings ends---------->

  // detail life saving starts-------------->
  let add_tot_f_life_cycle = document.querySelector("#de_fuel_ife-save").innerText;
  let add_tot_main_life_cycle = document.querySelector("#de_main_life-save").innerText;
  let new_tot_of_life_cycle_savings = toNumber(add_tot_f_life_cycle) + toNumber(add_tot_main_life_cycle);
  document.querySelector("#total_life_savings").innerText = new_tot_of_life_cycle_savings.toLocaleString();
  document.getElementsByName('operational-savings__life-cycle').forEach((value) => value.value = new_tot_of_life_cycle_savings.toLocaleString());
  // detail life savigs ends------------------->

  // detail payback year starts----->
  let new_op_con_purchase = document.getElementById("filter-2-purchase-price-ts").value;
  let new_op_enpack_purchase = document.getElementById("filter-2-purchase-price-te").value;
  let new_de_tot_payback = (toNumber(new_op_enpack_purchase) - toNumber(new_op_con_purchase)) / new_tot_of_annual_save;
  document.getElementById("total_payback_year").innerText = new_de_tot_payback.toFixed(1);
  document.getElementsByName('operational-savings__payback').forEach((value) => value.value = new_de_tot_payback.toFixed(0));
  // details payback year ends----->

  // ----------------------------assest life insurance starts --------------------------->
  // ----assest annual savings---->
  let asset_op_con_purchase = document.getElementById("filter-2-purchase-price-ts").value;
  let asset_op_con_end_life = document.getElementById("filter-2-end-of-life-ts").value;
  let assest_op_con_life_cycle = document.getElementById("filter-2-life-cycle-ts").value;
  let assest_op_enp_puchase = document.getElementById("filter-2-purchase-price-te").value;
  let assest_op_enp_end_life = document.getElementById("filter-2-end-of-life-te").value;
  let assest_op_enp_life_cycle = document.getElementById("filter-2-life-cycle-te").value;
  let assest_life_total_annual_save =
    (toNumber(asset_op_con_purchase) - toNumber(asset_op_con_end_life)) /
      assest_op_con_life_cycle -
    (toNumber(assest_op_enp_puchase) - toNumber(assest_op_enp_end_life)) /
      assest_op_enp_life_cycle;
  let assest_life_total_annual_save_round0ff = Math.round(assest_life_total_annual_save);
  document.getElementById("assest_annual_per_result").innerHTML = assest_life_total_annual_save_round0ff.toLocaleString();
  document.getElementsByName('life-extension-savings__annual-per-truck').forEach((value) => value.value = assest_life_total_annual_save_round0ff.toLocaleString());
  // ---assest annual savings----->

  // assest annual fleet starts-------->
  let asset_op_fleet_size = document.getElementById("filter-1-fleet-size").value;
  let assest_total_fleet_size = assest_life_total_annual_save * asset_op_fleet_size;
  document.getElementById("assest-annual_fleet_size_calc").innerHTML = Math.round(assest_total_fleet_size).toLocaleString();
  document.getElementsByName('life-extension-savings__annual-fleet').forEach((value) => value.value = Math.round(assest_total_fleet_size).toLocaleString());
  // assest annual fleet ends--------------->

  // assest life cycle starts------------------>
  let assest_op_life_years = document.getElementById("filter-2-life-cycle-ts").value;
  let assest_total_life_cycle_savings = assest_total_fleet_size * assest_op_life_years;
  document.getElementById("assest_life_cycle_row").innerHTML = Math.round(assest_total_life_cycle_savings).toLocaleString();
  document.getElementsByName('life-extension-savings__life-cycle').forEach((value) => value.value = Math.round(assest_total_life_cycle_savings).toLocaleString());
  // assest life cycle ends

  // assest payback years starts----------------->
  let assest_tot_pay_year = (toNumber(assest_op_enp_puchase) - toNumber(asset_op_con_purchase)) / assest_life_total_annual_save;
  document.getElementById("assest_payback_year").innerHTML = assest_tot_pay_year.toFixed(1);
  document.getElementsByName('life-extension-savings__payback').forEach((value) => value.value = assest_tot_pay_year.toFixed(0));
  // assest payback years ends --------------->
  // ----------------------------assest life insurance ends------------------->

  //----------- total potenetional starts-------------------->

  // TOT POT ANNUAL SAVINGS STARTS---------------->
  let tot_pot_annual_savings = new_tot_of_annual_save + assest_life_total_annual_save;
  document.getElementById("pot_annual_save_truck").innerHTML = Math.round(tot_pot_annual_savings).toLocaleString();
  document.getElementsByName('total-savings__annual-per-truck').forEach((value) => Math.round(tot_pot_annual_savings).toLocaleString());
  // TOT POT ANNUAL SAVINGS ENDS----->

  // tot pot annul fleet save starts------>
  let tot_pot_annual_fleet_savings = new_tot_of_fleet_save + assest_total_fleet_size;
  document.getElementById("pot_annual_save_fleet").innerHTML = Math.round(tot_pot_annual_fleet_savings).toLocaleString();
  document.getElementsByName('total-savings__annual-fleet').forEach((value) => Math.round(tot_pot_annual_fleet_savings).toLocaleString());
  // tot pot annul fleet save ends------>

  // tot pot life cycle starts----------------->
  let tot_pot_life_fleet_savings = new_tot_of_life_cycle_savings + assest_total_life_cycle_savings;
  document.getElementById("pot_life_savings").innerHTML = Math.round(tot_pot_life_fleet_savings).toLocaleString();
  document.getElementsByName('total-savings__life-cycle').forEach((value) => Math.round(tot_pot_life_fleet_savings).toLocaleString());
  // tot pot life cycle ends------->

  // tot pot payback starts------->
  let pot_tot_pay_years = (toNumber(assest_op_enp_puchase) - toNumber(asset_op_con_purchase)) / tot_pot_annual_savings;
  document.getElementById("pot_pay_year").innerHTML = pot_tot_pay_years.toFixed(1);
  document.getElementsByName('total-savings__payback').forEach((value) => pot_tot_pay_years.toFixed(0));
  // tot pot payback ends------->
  // ----------- total potenetional ends-------------------->

}

function setTwoNumberDecimal(event) {
  this.value = parseFloat(this.value).toFixed(2);
}

function downloadAsPdf() {
  window.print();
}
//to convert number to string and preventing input of characters
function toStrg(val) {
  let ptr = /^[A-Za-z]+$/;
  // let ptr=/^[\w\s@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/;
  if (ptr.test(val) !== true) {
    let ele_val = val.replace(/,/gi, "");
    return ele_val.split(/(?=(?:\d{3})+$)/).join(",");
  } else {
    return "";
  }
}

const priceInput = document.getElementsByClassName("two-decimal");
for (let i = 0; i < priceInput.length; i++) {
  priceInput[i].addEventListener("change", function () {
    console.log(priceInput[i].value);
    let price = Number(priceInput[i].value);

    if (!isNaN(price)) {
      price = price.toFixed(2).toLocaleString('en');
      priceInput[i].value = price;
    }
  });
}

const zeroInput = document.getElementsByClassName("zero-decimal");
for (let i = 0; i < zeroInput.length; i++) {
  zeroInput[i].addEventListener("change", function () {
    console.log(zeroInput[i].value);
    let zero = Number(zeroInput[i].value);

    if (!isNaN(zero)) {
      zero = zero.toFixed(0).toLocaleString('en');
      zeroInput[i].value = zero;
    }
  });
}

// Update Purchase Price/End of Life/Life Cycles
document.querySelectorAll('.st-filter-two-inner input').forEach((input) => {
  input.addEventListener('input', function(e) {
    let value = e.target.value.replace(/,/g, '');
    console.log(typeof value);
    console.log(value);
    let numberValue = parseFloat(value);
    console.log({numberValue});

    if (e.target.id == 'filter-2-purchase-price-ts') {
      document.getElementById('filter-2-purchase-price-te').value = (numberValue + 25000).toLocaleString();
    }
    if (e.target.id == 'filter-2-end-of-life-ts') {
      document.getElementById('filter-2-end-of-life-te').value = (numberValue + 5000).toLocaleString();
    }
    if (e.target.id == 'filter-2-life-cycle-ts') {
      document.getElementById('filter-2-life-cycle-te').value = (numberValue + 3).toLocaleString();
    }
    if (e.target.id == 'filter-2-purchase-price-te') {
      document.getElementById('filter-2-purchase-price-ts').value = (numberValue - 25000).toLocaleString();
    }
    if (e.target.id == 'filter-2-end-of-life-te') {
      document.getElementById('filter-2-end-of-life-ts').value = (numberValue - 5000).toLocaleString();
    }
    if (e.target.id == 'filter-2-life-cycle-te') {
      document.getElementById('filter-2-life-cycle-ts').value = (numberValue - 3).toLocaleString();
    }
  });
});

// Submit form and calc data
function submitForm(form) {
  console.log({form});
  let formData = new FormData(form);
  let payload = {};
  payload = formatCalcData();
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
    if (key == 'itw01_address1country') {
      payload['itw01_Address1_Country@odata.bind'] = `/itw01_countries(` + value + `)`;
    } else {
      payload[key] = value; // add the form field key-value pair to the object
    }
  }
  payload['itw01_pwp_lead_source_detail'] = 'TCO Calculator'; // Add detail property
  payload['campaignid@odata.bind'] = '/campaigns(1cf49723-a82f-ed11-9db1-000d3a59f13d)'; // Add campaignid property
  if (form.id == 'sales-form') { // If form is sales form
    payload['leadqualitycode'] = '1'; // Add leadqualitycode property
  }
  let payloadString = JSON.stringify(payload);
  console.log(payloadString, typeof payloadString);

  fetch('/enpak/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payloadString
  })
}

// Get calculation data from detail tab
function formatCalcData() {
  let new_sk_fuelsavingsannualpertruck = Number(document.getElementById('de_fuel_annual_save').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_fuelsavingsannualfleet = Number(document.getElementById('de_fuel_annual_fleet_save').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_fuelsavingslifecycle = Number(document.getElementById('de_fuel_ife-save').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_fuelsavingspayback = Number(document.getElementById('de_fuel_payback').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_maintenancesavingsannualpertruck = Number(document.getElementById('de_main_annual_save').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_maintenancesavingsannualfleet = Number(document.getElementById('de_main_fleet_annual_save').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_skmaintenancesavingslifecycle = Number(document.getElementById('de_main_life-save').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_maintenancesavingspayback = Number(document.getElementById('de_main_payback').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_operationalsavingsannualpertruck = Number(document.getElementById('total_annual_savings').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_operationalsavingsannualfleet = Number(document.getElementById('total-fleet_savings').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_operationalsavingslifecycle = Number(document.getElementById('total_life_savings').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_operationalsavingspayback = Number(document.getElementById('total_payback_year').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_lifeextensionsavingsannualpertruck = Number(document.getElementById('assest_annual_per_result').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_lifeextensionsavingsannualfleet = Number(document.getElementById('assest-annual_fleet_size_calc').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_lifeextensionsavingslifecycle = Number(document.getElementById('assest_life_cycle_row').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_lifeextensionsavingspayback = Number(document.getElementById('assest_payback_year').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_totalsavingsannualpertruck = Number(document.getElementById('pot_annual_save_truck').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_totalsavingsannualfleet = Number(document.getElementById('pot_annual_save_fleet').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_totalsavingslifecycle = Number(document.getElementById('pot_life_savings').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let new_sk_totalsavingspayback = Number(document.getElementById('pot_pay_year').innerHTML.replace('<b>','').replace('</b>','').replace(/,/g, ''));
  let calcData = {
    new_sk_fuelsavingsannualpertruck: new_sk_fuelsavingsannualpertruck,
    new_sk_fuelsavingsannualfleet: new_sk_fuelsavingsannualfleet,
    new_sk_fuelsavingslifecycle: new_sk_fuelsavingslifecycle,
    new_sk_fuelsavingspayback: new_sk_fuelsavingspayback,
    new_sk_maintenancesavingsannualpertruck: new_sk_maintenancesavingsannualpertruck,
    new_sk_maintenancesavingsannualfleet: new_sk_maintenancesavingsannualfleet,
    new_skmaintenancesavingslifecycle: new_skmaintenancesavingslifecycle,
    new_sk_maintenancesavingspayback: new_sk_maintenancesavingspayback,
    new_sk_operationalsavingsannualpertruck: new_sk_operationalsavingsannualpertruck,
    new_sk_operationalsavingsannualfleet: new_sk_operationalsavingsannualfleet,
    new_sk_operationalsavingslifecycle: new_sk_operationalsavingslifecycle,
    new_sk_operationalsavingspayback: new_sk_operationalsavingspayback,
    new_sk_lifeextensionsavingsannualpertruck: new_sk_lifeextensionsavingsannualpertruck,
    new_sk_lifeextensionsavingsannualfleet: new_sk_lifeextensionsavingsannualfleet,
    new_sk_lifeextensionsavingslifecycle: new_sk_lifeextensionsavingslifecycle,
    new_sk_lifeextensionsavingspayback: new_sk_lifeextensionsavingspayback,
    new_sk_totalsavingsannualpertruck: new_sk_totalsavingsannualpertruck,
    new_sk_totalsavingsannualfleet: new_sk_totalsavingsannualfleet,
    new_sk_totalsavingslifecycle: new_sk_totalsavingslifecycle,
    new_sk_totalsavingspayback: new_sk_totalsavingspayback
  };
  return calcData;
}