get '/' do
  erb :index
end

post '/save' do
  # p params
  Cookie.create_from_json(params)
end

get '/getjson' do
  oven = Oven.last
  table = Table.last
  p '--------------'
  begin oven.cookies
    ovenstuff = oven.cookies
  rescue 
    ovenstuff = 0
  end

  begin table.cookies
    tablestuff = table.cookies
  rescue 
    tablestuff = 0
  end

  {oven: ovenstuff, table: tablestuff}.to_json
end