import shutil
import datetime
import os

def execute_production_database_backup():
    primary_database_file = 'instance/canteen_database.db'
    backup_destination_directory = 'backups/'

    # Generate uniform timestamp formatting string
    current_timestamp = datetime.datetime.now().strftime('%D%m%y_&H%M%S')
    backup_output_name = f"canteen_backup_{current_timestamp}.db"

    if not os.path.exists(backup_destination_directory):
        os.makedirs(backup_destination_directory)

    full_destination_path = os.path.join(backup_destination_directory, backup_output_name)

    # Copy the database file cleanly while preserving system metadata
    shutil.copy2(primary_database_file, full_destination_path)
    print(f"[BACKUP SUCCESSFULL] File created at: {full_destination_path}")

if __name__ == "__main__":
    execute_production_database_backup