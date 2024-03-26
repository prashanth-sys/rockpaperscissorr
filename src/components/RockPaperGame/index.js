import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import GamePopup from '../GamePopup'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaperGame extends Component {
  state = {
    count: 0,
    isShow: true,
    selectedImage: null,
    opponentImage: null,
    result: null,
    isModelOpen: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const {result} = this.state
    if (prevState.result !== result && result !== null) {
      this.updateScore()
    }
  }

  onClickResultsView = image => {
    const opponentImage = this.getRandomOpponentImage()
    const result = this.determineResult(image, opponentImage)
    this.setState({
      isShow: false,
      selectedImage: image,
      opponentImage,
      result,
    })
  }

  getRandomOpponentImage = () => {
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return choicesList[randomIndex]
  }

  closePopup = () => {
    this.setState({
      isShow: true,
      selectedImage: null,
      opponentImage: null,
      result: null,
    })
  }

  onClickPlayAgain = () => {
    this.setState({
      isShow: true,
      selectedImage: null,
      opponentImage: null,
      result: null,
    })
  }

  determineResult = (selectedImage, opponentImage) => {
    if (selectedImage.id === opponentImage.id) {
      return 'IT IS DRAW'
    }
    if (
      (selectedImage.id === 'ROCK' && opponentImage.id === 'SCISSORS') ||
      (selectedImage.id === 'PAPER' && opponentImage.id === 'ROCK') ||
      (selectedImage.id === 'SCISSORS' && opponentImage.id === 'PAPER')
    ) {
      return 'YOU WON'
    }
    return 'YOU LOSE'
  }

  updateScore = () => {
    const {count, result} = this.state
    if (result === 'YOU WON') {
      this.setState({count: count + 1})
    } else if (result === 'YOU LOSE') {
      this.setState({count: count - 1})
    }
  }

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  render() {
    const {
      isModelOpen,
      count,
      isShow,
      selectedImage,
      opponentImage,
      result,
    } = this.state
    return (
      <div className="bg-container">
        <div className="rock-rules-card">
          <div>
            <Link to="/rock-paper-scissor" className="link">
              <button className="rock-back-button" type="button">
                <BiArrowBack className="arrow-icon" />
                <p className="arrow-back">Back</p>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <GamePopup isOpen={isModelOpen} onClose={this.toggleModel} />
          <button className="game-rules-button" type="button">
            Rules
          </button>
        </div>
        <h1 className="rock-heading">ROCK PAPER SCISSOR</h1>
        <div className="card-container">
          <div className="heading-container">
            <h1 className="game-name">
              ROCK <br />
              PAPER <br />
              SCISSORS
            </h1>
          </div>

          <div className="score-container">
            <p className="score-heading">score</p>
            <p className="scores-heading">{count}0</p>
          </div>
        </div>
        <div className="test-1">
          {isShow ? (
            choicesList.map((image, index) => (
              <div
                key={image.id}
                className={`image-container ${
                  index === 1 ? 'your-custom-class' : ''
                }`}
              >
                <button
                  type="button"
                  className="game-button"
                  data-testid={`${image.id.toLowerCase()}Button`}
                  onClick={() => this.onClickResultsView(image)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.id.toLowerCase()}
                    className="r-p-s-image"
                  />
                </button>
              </div>
            ))
          ) : (
            <div>
              <div className="game-show-container">
                <div className="game-container">
                  <h1 className="game-heading">YOU</h1>
                  <img
                    src={selectedImage.imageUrl}
                    alt="your choice"
                    className="selected-image"
                  />
                </div>
                <div className="game-container">
                  <h1 className="game-heading">OPPONENT</h1>
                  <img
                    src={opponentImage.imageUrl}
                    alt="opponent choice"
                    className="selected-image"
                  />
                </div>
              </div>
              <div className="play-again-container">
                <button
                  type="button"
                  className="playButton"
                  onClick={this.onClickPlayAgain}
                  data-testid="rockButton"
                >
                  PLAY AGAIN
                </button>
                {result && <p className="game-result">{result}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="button-container">
          <GamePopup
            showPopup={!isShow && selectedImage !== null}
            closePopup={this.closePopup}
          />
        </div>
      </div>
    )
  }
}
export default RockPaperGame
