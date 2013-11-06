get '/' do
  erb :index
end

post '/save' do
  p params
  Cookie.create_from_json(json_object: params)
end

get '/getjson' do

  if Cookie.last
    Cookie.last.json_object.to_json
  end
  {'type' => @cookie.type, 'time' => @cookie.time}.to_json
end
