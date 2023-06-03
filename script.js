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
  }
  