import React, { Component } from "react";
import {Pane, RadioGroup,Card, Heading, Label, Textarea, Button, Spinner} from 'evergreen-ui';
import { Spring,config } from "react-spring/renderprops";

class Art extends Component {

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
    result:null
  }

  generateCustom(){
    this.setState({loading:true})
    const data = new FormData()
    data.append('poem', this.state.customPoem)

    fetch(`http://127.0.0.1:5000/generateCustom`, {
          method: ['POST'],
          body: data
      }).then(this.setState({loading:false}))
  }

  generateAuto(){
    this.setState({loading:true})
    const data = new FormData()
    data.append('poemId', this.state.poemChoice)

    fetch(`http://127.0.0.1:5000/getArt`, {
          method: ['POST'],
          body: data
      }).then(res =>{
              return res.json()
              }).then(response => {
          this.setState({loading:false,
                          result:response['success']
                        })
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

  resultImage(){
    return (
      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        { props => (
        <div className='primary' style={props}>
          <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
            {this.state.loading? <Spinner size={48}/> : null}
          </Pane>
        </div>
      )}
    </Spring>
    )
  }

  custom = () => {
    return (
      <Spring
        from={{ opacity: 0.6, marginTop: -20 }}
        to={{ opacity: 1, marginTop: 20 }}
        config={config.slow}
        >
        { props => (
        <div className='primary' style={props}>
          <Heading size={700}> Step 2</Heading>
          <Label htmlFor="textarea-2" color='#FFF' marginTop={10} display="block"> Enter a poem below. </Label>
          <Textarea name="customPoem"
          placeholder="Roses are red, violets are blue, here's an example poem, you can write your own too!"
          marginTop={10}
          isRequired={true}
          onChange={e => this.validatePoem(e.target.value)}/>
          <Button appearance='primary' height={40} iconBefore='flame' disabled={this.state.generateButtonDisabled} onClick={()=>this.generateCustom()} >Generate! </Button>
        </div>
      )}
      </Spring>
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

        <Spring
          from={{ opacity: 0.6, marginTop: -20 }}
          to={{ opacity: 1, marginTop: 20 }}
          config={config.slow}
          >
        {props => (<div className='primary' style={props}>
            <Card>
                <Heading size={700}> Step 1</Heading>
                <RadioGroup
                  marginTop={5}
                  defaultValue='null'
                  size={16}
                  label="Choose a pre-existing artwork we've generated or enter in a poem of your choice and see what our network can create!"
                  options={this.state.options}
                  onChange={value => this.setState({ choice:value })}
                  isRequired={true}
                  color='#FFF'
                  />
            </Card>
          </div>
        )}
        </Spring>

        {this.state.choice!==null && (this.state.choice==='custom' ? this.custom(): this.auto())}
        {this.state.loading!==null ? this.resultImage(): null}
    </div>
    );
  }
}

export default Art;
