import React, { Component } from "react";
import Slideshow from 'react-slidez';
import { Slide, Fade } from 'react-slideshow-image';
import {Text} from 'evergreen-ui'



const fadeImages = [
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
  'images/7.png',
  'images/8.png',
  'images/9.png',
  'images/10.png',
  'images/11.png',

];

const slideText = [
  `The Sea that bares her bosom to the moon.
  The winds that will be howling at all hours`,


  `Roads go ever ever on,
Over rock and under tree,
By caves where never sun has shone,
By streams that never find the sea;
Over snow by winter sown,
And through the merry flowers of June,
Over grass and over stone,
And under mountains of the moon.`,


  `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth`,


`The wind blows I breathe deeply
I close my eyes so tight, I can barely see light`,


`Life is like a fire.
If you can't control your flame,
You're bound to be burned.`,


`The elephant is a thing to behold,
with colors more beautiful than gold.`,

`In the night I see the moon,
A flower in the field of the night sky`,

`What are heavy? Sea-sand and sorrow;
What are brief? Today and tomorrow;
What are frail? Spring blossoms and youth;
What are deep? The ocean and truth.`,


`They say it's sweet that we laugh
because our bodies literally
can't contain the
joy.`,


`The butterfly is a thing to behold,
with colors more beautiful than gold.`,

`Three rings for the pasta, under the sky
Four for the trees, in their halls of stone
And nine for the mortal fish, doomed to leaves
In the land of Mordor, where the shadows lie`,
]

const fadeProperties = {
  duration: 15000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
}

const getSlides = () => {
  let slides = []
  for (let i=0; i<fadeImages.length; i++){
    let text = '\n\n' + slideText[i]
    slides.push( <div className="each-fade">
                  <div style={{float:'left', width:'30%'}}>
                    <div className='primary2'>{text}</div>
                  </div>
                  <img style={{float:'left', width:'auto'}} className='image-container' src={fadeImages[i]} />
                  </div>)
  }
  return slides
}

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{height:20, textAlign: 'center'}}>
          <div className='titles' style={{float:'left', width:'30%'}}>
            <strong>POEM</strong>
          </div>
          <div className='titles' style={{float:'left', width:720, marginRight:2}}>
              <strong>GENERATED IMAGE</strong>
          </div>
        </div>
        <Fade {...fadeProperties} children={getSlides()}/>
      </div>
    );
  }
}

export default Home;
