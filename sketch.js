let points = []
let delaunay , voronoi ;
let pic;
function preload()
{
  pic = loadImage("sample.jpg")
}
function setup() {
  createCanvas(400, 600);
  pic.resize(400,600)
  for(let i = 0 ; i<200000 ; i++)
    {
      let x = random(width) ;
      let y = random(height);
      let col = pic.get(x,y)
      if (random(100) > brightness(col)){
        points.push(createVector(x,y));
      }
      else{
        i--
      }
    }

    delaunay = calculateDelaunay(points)
    voronoi  = delaunay.voronoi ([0,0,width, height]);
    // noLoop()
}

function draw() {
  background(255);

  for(let v of points)
    {
      stroke(0);
      strokeWeight(.8);
      point(v.x , v.y);
    }
    
      let polygons = voronoi.cellPolygons();
      let cells = Array.from(polygons);

      // for(let poly of cells)
      //   {
      //     stroke(0);
      //     strokeWeight(1);
      //     noFill();
      //     beginShape();
      //     for(let i = 0 ; i< poly.length ; i++)
      //       {
      //       vertex(poly[i][0] , poly[i][1]);

      //     }
      //     endShape();
      //   }
      
      let centroids = []
      for(let poly of cells){
        let area = 0;
        let centroid = createVector(0,0);
        for(i = 0 ; i< poly.length ; i++)
          {
            let v0 = poly[i] ;
            let v1 = poly[(i +1)% poly.length];
            let crossValue = v0[0]*v1[1] - v0[1]*v1[0] ;
            area+= crossValue;
            centroid.x += (v0[0]+v1[0])*crossValue;
            centroid.y += (v0[1]+v1[1])*crossValue;
          }
        area /=2;
        centroid.div(6*area);
        centroids.push(centroid)
        // let centroid = createVector(0,0)
        // for (const vertex of poly) {
        //     centroid.x += vertex[0]; // Add x-coordinate of vertex
        //     centroid.y += vertex[1]; // Add y-coordinate of vertex
        // }
        // centroid.div(poly.length) // Average y-coordinates for centroid
        // // stroke(255, 0, 0); // Set stroke color to red this basically sets the property not applies it throughout the code/figure
        // // strokeWeight(4); // Adjust stroke weight for better visibility
        // // point(centroid.x, centroid.y);
        // centroids.push(centroid)
    }
          //stroke(0); // Set stroke color back to black
          //strokeWeight(1);
        
        for(let i = 0; i< points.length; i++){
          points[i].lerp(centroids[i],1)
        }
        delaunay = calculateDelaunay(points)
        voronoi = delaunay.voronoi([0,0,width, height])

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

