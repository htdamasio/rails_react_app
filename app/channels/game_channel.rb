class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_channel_#{params[:game_id]}_#{params[:game_room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data
  end
end
