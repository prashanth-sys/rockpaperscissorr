import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import GamePopup from '../GamePopup'

import './index.css'

class RockPaperGame extends Component {
  state = {isModelOpen: false}

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  render() {
    const {isModelOpen} = this.state
    return (
      <div className="bg-container">
        <div className="rock-rules-card">
          <div>
            <Link to="/rock-paper-scissor" className="link">
              <button className="game-back-button" type="button">
                <BiArrowBack className="arrow-icon" />
                <p className="arrow-back">Back</p>
              </button>
            </Link>
          </div>
        </div>
        <GamePopup isOpen={isModelOpen} onClose={this.toggleModel} />
        <button className="game-rules-button" type="button">
          Rules
        </button>
      </div>
    )
  }
}
export default RockPaperGame
