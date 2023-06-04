function handleCheckboxChange(checkbox) {
  var singlePalletCheckbox = document.getElementById("singlePalletCheckbox");
  var doublePalletCheckbox = document.getElementById("doublePalletCheckbox");
  var customPalletCheckbox = document.getElementById("customPalletCheckbox");
  
  // If the Single Pallet checkbox is checked
  if (checkbox === singlePalletCheckbox && checkbox.checked) {
    // Populate the single pallet input fields with predetermined values
    document.getElementById("singlePalletLength").value = "1200";
    document.getElementById("singlePalletWidth").value = "1000";
    document.getElementById("singlePalletHeight").value = "1800";
    document.getElementById("singlePalletMaxWeight").value = "600";
    
    // Uncheck the Double Pallet checkbox
    doublePalletCheckbox.checked = false;
    customPalletCheckbox.checked = false;
  }
  
  // If the Double Pallet checkbox is checked
  if (checkbox === doublePalletCheckbox && checkbox.checked) {
    // Populate the double pallet input fields with predetermined values
    document.getElementById("doublePalletLength").value = "2400";
    document.getElementById("doublePalletWidth").value = "1000";
    document.getElementById("doublePalletHeight").value = "1800";
    document.getElementById("doublePalletMaxWeight").value = "500";
    
    // Uncheck the Single Pallet checkbox
    singlePalletCheckbox.checked = false;
    customPalletCheckbox.checked = false;
  }

  if (checkbox === customPalletCheckbox && checkbox.checked) {
    // Populate the single pallet input fields with predetermined values
    document.getElementById("customPalletLength").value;
    document.getElementById("customPalletWidth").value;
    document.getElementById("customPalletHeight").value;
    document.getElementById("customPalletMaxWeight").value;
    
    // Uncheck the Double Pallet checkbox
    singlePalletCheckbox.checked = false;
    doublePalletCheckbox.checked = false;
  }
}

function calculateMaxProducts() {
  var singlePalletCheckbox = document.getElementById("singlePalletCheckbox");
  var doublePalletCheckbox = document.getElementById("doublePalletCheckbox");
  var customPalletCheckbox = document.getElementById("doublePalletCheckbox");
  
  // Single Pallet
  if (singlePalletCheckbox.checked) {
    var palletLength = parseInt(document.getElementById("singlePalletLength").value);
    var palletWidth = parseInt(document.getElementById("singlePalletWidth").value);
    var palletHeight = parseInt(document.getElementById("singlePalletHeight").value);
    var maxPalletWeight = parseInt(document.getElementById("singlePalletMaxWeight").value);
  } 
  // Double Pallet
  else if (doublePalletCheckbox.checked) {
    var palletLength = parseInt(document.getElementById("doublePalletLength").value);
    var palletWidth = parseInt(document.getElementById("doublePalletWidth").value);
    var palletHeight = parseInt(document.getElementById("doublePalletHeight").value);
    var maxPalletWeight = parseInt(document.getElementById("doublePalletMaxWeight").value);
  } 
  // No Pallet checkbox is selected
  else {
    alert("Please select a pallet configuration.");
    return;
  }
  
  var productLength = parseInt(document.getElementById("productLength").value);
  var productWidth = parseInt(document.getElementById("productWidth").value);
  var productHeight = parseInt(document.getElementById("productHeight").value);
  var productWeight = parseInt(document.getElementById("productWeight").value);
  
  // Validate input values
  if (isNaN(palletLength) || isNaN(palletWidth) || isNaN(palletHeight) || isNaN(maxPalletWeight) || isNaN(productLength) || isNaN(productWidth) || isNaN(productHeight) || isNaN(productWeight)) {
    alert("Please enter valid product dimensions.");
    return;
  }
  
  var maxProductsLengthwise = Math.floor(palletLength / productLength) * Math.floor(palletWidth / productWidth) * Math.floor(palletHeight / productHeight);
  var maxProductsSideways = Math.floor(palletLength / productWidth) * Math.floor(palletWidth / productLength) * Math.floor(palletHeight / productHeight);
  var maxProductsHeightwise = Math.floor(palletLength / productHeight) * Math.floor(palletWidth / productWidth) * Math.floor(palletHeight / productLength);
  
  var maxProducts = Math.max(maxProductsLengthwise, maxProductsSideways, maxProductsHeightwise);
  
  var orientation = "";
  if (maxProducts == maxProductsLengthwise) {
    orientation = "Lengthwise";
  } else if (maxProducts == maxProductsSideways) {
    orientation = "Sideways";
  } else {
    orientation = "Heightwise";
  }
  
  var maxWeight = maxProducts * productWeight;
  if (maxWeight > maxPalletWeight) {
    maxProducts = Math.floor(maxPalletWeight / productWeight);
  }
  
  var maxProductsDoublePallet = 0;
  if (productLength <= (palletLength / 2) && productWidth <= palletWidth && productHeight <= palletHeight) {
    var maxProductsFlat = Math.floor(palletLength / productLength) * Math.floor(palletWidth / productWidth) * Math.floor(palletHeight / productHeight);
    var maxProductsStanding = Math.floor((palletWidth - productWidth) / productLength) * Math.floor(palletLength / productWidth) * Math.floor(palletHeight / productHeight);
    maxProductsDoublePallet = Math.max(maxProductsFlat, maxProductsStanding);
  }
  
  if (maxProductsDoublePallet > maxProducts) {
    maxProducts = maxProductsDoublePallet;
    orientation = "";
  }
  
  var warningMessageOne = document.getElementById("warningMessageOne");
  var warningMessageTwo = document.getElementById("warningMessageTwo");
  
  if (palletLength <= 1200 && maxPalletWeight > 601) {
    warningMessageOne.innerHTML = "Warning: Pallet may be overweight for racking, (>600kg).";
    warningMessageTwo.innerHTML = "Please select a pallet weight of 500kg max for racking.";
  } else if (palletLength > 1200 && palletLength <= 2400 && maxPalletWeight > 501) {
    warningMessageOne.innerHTML = "Warning: This pallet may be overweight for racking, (>500kg).";
    warningMessageTwo.innerHTML = "For pallets of this size, consider setting the max weight as 500kg for racking.";
  } else if (maxPalletWeight > 850) {
    warningMessageOne.innerHTML = "Warning: Maximum permissible weight of the pallet is 850kg.";
    warningMessageTwo.innerHTML = "";
  } else {
    warningMessageOne.innerHTML = "";
    warningMessageTwo.innerHTML = "";
  }
  
  document.getElementById("maxProducts").innerHTML = "Maximum number of products that can be stacked: " + maxProducts;
  document.getElementById("optimalOrientation").innerHTML = "Optimal orientation: " + orientation;
}
