function calculateMaxProducts() {
  var palletLength = parseInt(document.getElementById("palletLength").value);
  var palletWidth = parseInt(document.getElementById("palletWidth").value);
  var palletHeight = parseInt(document.getElementById("palletHeight").value);
  var maxPalletWeight = parseInt(document.getElementById("maxPalletWeight").value);
  
  var productLength = parseInt(document.getElementById("productLength").value);
  var productWidth = parseInt(document.getElementById("productWidth").value);
  var productHeight = parseInt(document.getElementById("productHeight").value);
  var productWeight = parseInt(document.getElementById("productWeight").value);
  
  // Validate input values
  if (isNaN(palletLength) || isNaN(palletWidth) || isNaN(palletHeight) || isNaN(maxPalletWeight) || isNaN(productLength) || isNaN(productWidth) || isNaN(productHeight) || isNaN(productWeight)) {
    alert("Please enter valid numeric values.");
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

  if (palletLength <=1200 && maxPalletWeight > 601) {
    document.getElementById("warningMessageOne").innerHTML = "Warning: Pallet may be overweight for racking, (>600kg).";
    document.getElementById("warningMessageTwo").innerHTML = "Please select pallet weight 500kg max for racking.";
  } else if(palletLength > 1200 && palletLength <= 2400 && maxPalletWeight > 501) {
    document.getElementById("warningMessageOne").innerHTML = "Warning: This pallet may be overweight for racking, (>500kg).";
    document.getElementById("warningMessageTwo").innerHTML = "For pallets of this size consider setting max weight as 500kg for racking";
  } else if (maxPalletWeight > 850) {
    document.getElementById("warningMessageOne").innerHTML = "Warning: Maximum permissible weight of pallet is 850kg";
  }
  
  
  document.getElementById("maxProducts").innerHTML = "Maximum number of products that can be stacked: " + maxProducts;
  document.getElementById("optimalOrientation").innerHTML = "Optimal orientation: " + orientation;

  // Check warnings
  
}




/*
function calculateMaxProducts() {
    var palletLength = parseInt(document.getElementById("palletLength").value);
    var palletWidth = parseInt(document.getElementById("palletWidth").value);
    var palletHeight = parseInt(document.getElementById("palletHeight").value);
    var maxPalletWeight = parseInt(document.getElementById("maxPalletWeight").value);
    
    var productLength = parseInt(document.getElementById("productLength").value);
    var productWidth = parseInt(document.getElementById("productWidth").value);
    var productHeight = parseInt(document.getElementById("productHeight").value);
    var productWeight = parseInt(document.getElementById("productWeight").value);
    
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
    
    document.getElementById("maxProducts").innerHTML = "Maximum number of products that can be stacked: " + maxProducts;
    document.getElementById("optimalOrientation").innerHTML = "Optimal orientation: " + orientation;
  }
  
  function resetForm() {
    document.getElementById("palletLength").value = "";
    document.getElementById("palletWidth").value = "";
    document.getElementById("palletHeight").value = "";
    document.getElementById("maxPalletWeight").value = "";
    document.getElementById("productLength").value = "";
    document.getElementById("productWidth").value = "";
    document.getElementById("productHeight").value = "";
    document.getElementById("productWeight").value = "";
    document.getElementById("maxProducts").innerHTML = "";
    document.getElementById("optimalOrientation").innerHTML = "";

    var warningMessage = "";
  if (palletLength <= 1200 && maxPalletWeight > 601) {
    warningMessage = "Warning: Pallet is below or equal to 1200mm in length and overweight (>600kg).";
  } else if (palletLength <= 1200 && maxPalletWeight > 501) {
    warningMessage = "Warning: Pallet is below or equal to 1200mm in length and overweight (>500kg).";
  } else if (maxPalletWeight > 501) {
    warningMessage = "Warning: Pallet is overweight (>500kg).";
  }
  document.getElementById("warning").innerHTML = warningMessage;
  }*/