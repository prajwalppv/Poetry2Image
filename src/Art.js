import React, { Component } from "react";
import {Pane, RadioGroup,Card, Heading, Label, Textarea, Button, Spinner,TextInput, Alert, toaster} from 'evergreen-ui';
import { Spring,config } from "react-spring/renderprops";

class Art extends Component {

  server = "ec2-35-167-30-160.us-west-2.compute.amazonaws.com"
  state = {
    options: [
      { label: 'Pre-generated artwork', value:'auto', checked:false},
      { label: 'Custom art', value:'custom', checked:false }
    ],
    poems: [
      { label: "Roses are red, violets are blue, you are a Flower, yes it is true!", value:'1'}
    ],
    choice:null,
    customPoem:null,
    generateButtonDisabled:true,
    loading:null,
    poemChoice:null,
    result:null,
    email:null,
    done:null,
    start_again_disabled:true
  }

  displayImage(response){
    this.setState({loading:false,
                    result:response['imagestr'],
                    start_again_disabled:false,
                  })
  }

  generateCustom(){
    this.setState({loading:true,result:null,done:null})
    const data = new FormData()
    data.append('poem', this.state.customPoem)

    fetch(`http://${this.server}:5000/generateCustom`, {
          method: ['POST'],
          body: data
      }).then(res =>{
              return res.json()
              }).then(response => {
                  this.displayImage(response)
                }).catch(e => {
                  toaster.danger(
                    "Oops! something seems to have gone wrong. Please refresh the page and try again"
                  )
                })
  }

  generateAuto(){
    this.setState({loading:true,result:null,done:null})
    const data = new FormData()
    data.append('poemId', this.state.poemChoice)

    fetch(`http://${this.server}:5000/getArt`, {
          method: ['POST'],
          body: data
      }).then(res =>{
              return res.json()
              }).then(response => {
          this.setState({loading:false,
                          start_again_disabled:false,
                          result:response['success']
                        })
                      }).catch(e => {
                        toaster.danger(
                          "Oops! something seems to have gone wrong. Please refresh the page and try again"
                        )
                      })
  }

  sendEmail(){
    const data = new FormData()
    data.append('email', this.state.email)
    data.append('choice',this.state.choice)
    if (this.state.choice == 'custom')
      data.append('poem', this.state.customPoem)
    else
      data.append('poem',this.state.poemChoice)

    fetch(`http://${this.server}:5000/sendEmail`, {
          method: ['POST'],
          body: data
      }).then(res => {
        this.setState({done:true
        });
        toaster.success('Email sent successfully');
                }
                ).catch(e => {
                  toaster.danger(
                    "Oops! something seems to have gone wrong. Please refresh the page and try again"
                  )
                })
  }

  validatePoem(text){
    if (text.length !== 0){
      this.setState({customPoem:text})
      this.setState({generateButtonDisabled:false})
    }
    else{
      this.setState({customPoem:''})
      this.setState({generateButtonDisabled:true})
    }
  }

  emailPane = () =>{
    return(
      <div style={{align:'center', position: 'relative', height: '100%', width: '100%'}}>
        <img style={{position: 'relative', height:'80%', width:'auto'}} src={"data:image/png;base64," + this.state.result}/>
        <Label color='#FFF' marginTop={10} display="block"> Enter your email  to receive a copy of the generated image </Label>
        <TextInput
            style={{float:'left'}}
            height={40}
            name="email-id"
            placeholder="Enter email-id"
            marginLeft={10}
            onChange={e => this.setState({email:e.target.value})}/>
        <Button appearance='primary' height={40} iconBefore='download' intent='success'
              onClick={()=>this.sendEmail()}> Send Email </Button>
        <Button style={{marginLeft:10}} appearance='primary' height={40} iconBefore='replay'
              disabled={this.state.start_again_disabled} onClick={()=>this.reset()}> Start Again! </Button>
      </div>
    )
  }

  reset(){
    this.setState({choice:null,
    customPoem:null,
    generateButtonDisabled:true,
    loading:null,
    poemChoice:null,
    result:null,
    email:null,
    done:null,
  start_again_disabled:true,})
  }

  resultImage(){
    return (
      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        { props => (
        <div className='primary' style={props}>
        <Heading size={700}> Voila!</Heading>
          <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
            {this.state.loading? <Spinner size={48}/> : null}
            {this.state.result? this.emailPane():null}
          </Pane>
        </div>
      )}
    </Spring>
    )
  }

  custom = () => {
    return (
      <div>
      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        { props => (
        <div className='primary' style={props}>
          <Heading size={700}> Enter a poem below </Heading>
          <Textarea name="customPoem"
          placeholder="Roses are red, violets are blue, here's an example poem, you can write your own too!"
          marginTop={10}
          isRequired={true}
          onChange={e => this.validatePoem(e.target.value)}/>
          <Button appearance='primary' height={40} iconBefore='flame' disabled={this.state.generateButtonDisabled} onClick={()=>this.generateCustom()} >Generate! </Button>
        </div>
      )}
      </Spring>

      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        { props => (
        <div className='primary' style={props}>
          <Heading size={700}> Example poems </Heading>
            <ol>
           <li><p>The Sea that bares her bosom to the moon.
           The winds that will be howling at all hours</p></li>
           <li><p>The wind blows, I breathe deeply, I close my eyes so tight, I can barely see light</p></li>
           <li> <p>The elephant is a thing to behold, with colors more beautiful than gold.</p></li>
            </ol>
        </div>
      )}
      </Spring>
      </div>
  )}

  auto = () => {
    return (
      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        { props => (
        <div className='primary' style={props}>
          <Heading size={700}> Step 2</Heading>
          <RadioGroup
            marginTop={5}
            defaultValue='null'
            size={16}
            label="Choose a poem"
            options={this.state.poems}
            onChange={value => this.setState({ poemChoice:value })}
            isRequired={true}
            color='#FFF'
            />

          <Button appearance='primary' height={40} iconBefore='flame' disabled={!this.state.poemChoice} onClick={()=>this.generateAuto()} >Generate! </Button>
        </div>
        )}
      </Spring>
  )}

  choice_change(value){
    this.setState({ choice:value,
      customPoem:null,
      generateButtonDisabled:true,
      loading:null,
      poemChoice:null,
      result:null,
      email:null,
      done:null,
    start_again_disabled:true,})
  }

  render() {
    return (
      <div>
      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        {props =>(
          <div style={props} className='primary'>
              <h2>Alo there! Let's create some art</h2>
          </div>
      )}
      </Spring>

      <div style={{float: 'left', width: '49%'}} children={this.custom()}>

        </div>
        <div style={{float: 'right', width: '49%'}}>
          {this.state.loading!==null ? this.resultImage(): null}
        </div>
    </div>
    );
  }
}

export default Art;
