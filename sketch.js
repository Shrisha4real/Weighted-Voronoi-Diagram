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
  for(let i = 0 ; i<400000 ; i++)
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

}

function draw() {
  background(255);

  

  for(let v of points)
    {
      stroke(0);
      strokeWeight(.65);
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
      
      let centroids = new Array(cells.length)
      let weights = new Array(cells.length)
      for (let i = 0 ; i<cells.length;  i++){
        centroids[i] = createVector(0,0);
        weights[i] = 0;
      }
      for (let i = 0 ; i<width;  i++){
        for (let j = 0 ; j<height;  j++){
          let index = i+j+ width;
          let r = pic.pixels[index+0]
          let g  = pic.pixels[index+1]
          let b  = pic.pixels[index+2]
          let a  =pic.pixels[index+3]
          let bright =( r+g+b)/3
          let weight = 1/(1+abs(bright-127))
          delaunayIndex = delaunay.find(i, j, delaunayIndex);
          centroids[delaunayIndex].x += i * weight;
          centroids[delaunayIndex].y += j * weight;
          weights[delaunayIndex] += weight;
          } 


        }
      for (let i = 0; i < centroids.length; i++) {
        if (weights[i] > 0) {
          centroids[i].div(weights[i]);
        } else {
          centroids[i] = points[i].copy();
        }
      }
        
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
    
    




function calculateDelaunay(points){ 
    let pointsArray = [];
    for (let v of points){
      pointsArray.push(v.x , v.y)
    }
    // console.log(pointsArray);
    return new d3.Delaunay(pointsArray)
}

