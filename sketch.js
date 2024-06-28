let points = []
let delaunay , voronoi

function setup() {
  createCanvas(600, 600);
  for(let i = 0 ; i<100 ; i++)
    {
      points[i] = createVector(random(width) , random(height));
    }

    delaunay = calculateDelaunay(points)
    voronoi  = delaunay.voronoi ([0,0,width, height]);

}

function draw() {
  background(255);
  for(let v of points)
    {
      stroke(0);
      strokeWeight(4);
      point(v.x , v.y);
    }
    noFill()
    stroke(0); // Black stroke (optional)

    strokeWeight(1);
    // let {points , triangles} = delaunay;
    // console.log(triangles);
    // console.log(triangles.length);
    // for(let i = 0 ; i< triangles.length ; i+=3){
    //   let a = 2*delaunay.triangles[i]
    //   let b = 2*delaunay.triangles[i+1]
    //   let c = 2*delaunay.triangles[i+2]
    //   triangle(
    //     points[a],
    //     points[a+1],
    //     points[b],
    //     points[b+1],
    //     points[c],
    //     points[c+1]

    //   );
      let polygons = voronoi.cellPolygons();
      let centroids = []
      for(let poly of polygons)
        {
          beginShape();
          for(let i = 0 ; i< poly.length ; i++)
            {
            vertex(poly[i][0] , poly[i][1]);

          }
          endShape();
          
          let centroidX = 0;
          let centroidY = 0;
          for (const vertex of poly) {
              centroidX += vertex[0]; // Add x-coordinate of vertex
              centroidY += vertex[1]; // Add y-coordinate of vertex
          }
          centroidX /= poly.length; // Average x-coordinates for centroid
          centroidY /= poly.length; // Average y-coordinates for centroid
          stroke(255, 0, 0); // Set stroke color to red this basically sets the property not applies it throughout the code/figure
          strokeWeight(4); // Adjust stroke weight for better visibility
          point(centroidX, centroidY);
          centroids.push(centroidX , centroidY)

          stroke(0); // Set stroke color back to black
          strokeWeight(1);
        }
        for(let i = 0; i< points.length; i++){
          points.lerp(centroids[i],1)
        }
        delaunay = calculateDelaunay(points)
        voronoi = delaunay.voronoi([0,0,width, length])

    // console.log(triangles);
    // console.log(triangles.length);
    
    }




function calculateDelaunay(points){ 
    let pointsArray = [];
    for (let v of points){
      pointsArray.push(v.x , v.y)
    }
    // console.log(pointsArray);
    return new d3.Delaunay(pointsArray)
}

