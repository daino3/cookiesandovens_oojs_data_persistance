class Cookie < ActiveRecord::Base
  belongs_to :oven
  belongs_to :table

  def self.create_from_json(hash)
    puts "HASH OVEN:"
    p hash[:oven]
    if hash[:oven]
      @oven = Oven.create
      hash[:oven].each do |key, value|
        cookie = Cookie.create(oven_id: @oven.id, cookie_type: value['type'], timeCooked: value['timeCooked'], bakeTime: value['bakeTime'])
      end
    end
    puts "HASH TABLE:"
    p hash[:prepTable]
    if hash[:prepTable]
      @table = Table.create
      hash[:prepTable].each do |key, value|
        cookie = Cookie.create(table_id: @table.id, cookie_type: value['type'], timeCooked: value['timeCooked'], bakeTime: value['bakeTime'])
      end
    end
  end
end
