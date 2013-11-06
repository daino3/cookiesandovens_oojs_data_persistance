class CreateCookies < ActiveRecord::Migration
  def change
    create_table :cookies do |t|
      t.json  :json_object

      t.timestamps
    end
  end
end
