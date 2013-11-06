class Table < ActiveRecord::Base
  has_many :cookies, class_name: 'Cookie'
end
