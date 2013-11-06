get '/' do
  erb :index
end

post '/save' do
  # p params
  Cookie.create_from_json(params)
end

get '/getjson' do
  @oven = Oven.last
  @table = Table.last
  {oven: @oven.cookies, table: @table.cookies}.to_json
end
